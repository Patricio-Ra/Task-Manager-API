const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const router = new express.Router();

// Public routes
// Create User.
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthTokenAndSave();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    };
});

// Login User.
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthTokenAndSave();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    };
});

// Auth routes.
// Logout User.
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    };
});

// Logout All Users.
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    };
});

// Get User.
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

// Update User.
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update within.'});
    };
    try {
        for (const update of updates) {
            req.user[update] = req.body[update];
        };
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    };
});

// Delete User.
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    };
});

// Upload Avatar route.
// Multer Upload Avatar Config.
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, 'resources/avatars');
//     },
//     filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}`);
//     }
// });

const uploadAvatar = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'resources/avatars')
        },
        filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
        }
    }),
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter(req, file, cb) {
        const mimeTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png', 'image/bmp'];
        if (!mimeTypes.includes(file.mimetype)) {
            return cb(new Error('File not compatible'));
        };
        if (!file.originalname.match(/\.(jpg|jpeg|png|bmp|gif)$/)) {
            return cb(new Error('File not compatible'));
        };
        cb(undefined, true);
        // cb(undefined, false);
    }
});
router.post('/users/me/avatar', uploadAvatar.single('avatar'), (req, res) => {
    res.send();
});

module.exports = router;