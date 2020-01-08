const express = require('express');
const uploadImage = require('../middleware/uploadImage');
const sharp = require('sharp');
const router = new express.Router();

router.post('/image/resize', uploadImage.single('image'), async (req, res) => {
    try {
        await sharp(req.file.path).resize({ 
            width: +req.body.width, 
            height: +req.body.height,
            fit: req.body.fit
        }).toFile(`images/resized/${req.body.name}-${req.body.fit}.png`, (e, data) => {
            if (e) {
                res.send(e);
            } else {
                res.send();
            };
        });
    } catch (e) {
        res.status(400).send(e);
    };
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

module.exports = router;