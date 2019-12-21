const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// MODELS //
const User = mongoose.model('User', {
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
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String, 
        trim: true,
        unique: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});


const user = new User({
    name: '  Patricio     ',
    email: 'someEmAiL@gmail.com',
    password: 'asdaaasa', 
    age: 20
});

user.save().then(user => {
    console.log(user);
}).catch(error => {
    console.log(error);
});

// const task = new Task({
//     description: 'Doing the womework'
// });

// task.save().then(() => {
//     console.log(task);
// }).catch(error => {
//     console.log(error);
// });