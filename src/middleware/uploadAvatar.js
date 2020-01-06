const multer = require('multer');

const uploadAvatar = multer({
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter(req, file, cb) {
        const mimeTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png', 'image/bmp'];
        if (!mimeTypes.includes(file.mimetype)) {
            return cb(new Error('File not compatible'));
        };
        if (!file.originalname.match(/\.(jpg|jpeg|png|bmp|gif)$/)) {
            return cb(new Error('File not compatible'));
        };
        cb(null, true);
    }
});

module.exports = uploadAvatar.single('avatar');


// storage: multer.diskStorage({
//     // destination: (req, file, cb) => {
//     // cb(null, 'resources/avatars');
//     // },
//     filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}`);
//     }
// }),