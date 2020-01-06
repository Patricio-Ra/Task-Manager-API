const express = require('express');
const uploadImage = require('../middleware/uploadImage');
const sharp = require('sharp');
const router = new express.Router();

router.post('/image/resize', uploadImage.single('image'), async (req, res) => {
    try {
        await sharp(req.file.path).resize({ width: +req.body.width, height: +req.body.height}).toFile(`images/resized/image.png`, (e, data) => {
            if (e) {
                console.log(e);
            } else {
                res.send();
            };
        });
    } catch (e) {
        res.status(400).send();
    };
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

module.exports = router;

// Upload User Avatar.
// router.post('/users/me/avatar', auth, uploadAvatar.single('avatar'), async (req, res) => {
//     const buffer = await sharp(req.file.buffer).resize({ width: 300, height: 300 }).png().toBuffer();
//     req.user.avatar = buffer;
//     await req.user.save();
//     res.send();
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
// });
