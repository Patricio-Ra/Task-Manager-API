const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');
const { sendCancelationEmail } = require('../services/emails');

// Schema.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(age) {
            if (age < 0) {
                throw new Error('Age must be a positive number.');
            };
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email is invalid.');
            };
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(pw) {
            if (pw.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password".');
            };
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
    avatarType: {
        type: String
    }
}, {
    timestamps: true
});


// Virtual Property for the Tasks relationship.
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

// Document's custom methods.
// Generates Auth Token and Saves the Document.
userSchema.methods.generateAuthTokenAndSave = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = [...user.tokens, { token }];
    await user.save();
    return token;
};

// .toJSON Middleware: Get Public User Profile.
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
};

// Model's custom methods.
// Gets a Document by its Credentials (so Checks if its valid).
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login.');
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login.');
    };

    return user;
};


// Middleware
// Hash the plain-text password before saving.
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    };

    next();
});

// Delete user tasks and send cancelation email when user is removed.
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    sendCancelationEmail(user.email, user.name);
    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;