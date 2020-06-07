const { Router } = require('express');
const { bucket } = require('../config/gcs');
const { v4 } = require('uuid');
const User = require('../models/User');
const verifyToken = require('../utils/verifyToken');
const path = require('path');
const multer = require('multer');
const router = Router();

const fileTypes = /image\/jpg|image\/png|image\/jpeg|image\/webp|image\/svg/;

const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (fileTypes.test(file.mimetype)) {
            return cb(null, true);
        }
        cb(new Error('Invalid mime type. Only jpg, svg, webp, jpeg, png are allowed'));
    },
});

['/profile', '/banner'].forEach((route) => {
    router.post(route, verifyToken, upload.any(), async (req, res) => {
        const { folder } = req.body;
        const fileUpload = bucket.file(
            `${folder}/${v4()}${path.extname(req.files[0].originalname)}`,
        );

        const stream = fileUpload.createWriteStream({
            predefinedAcl: 'publicRead',
            metadata: {
                contentType: req.files[0].mimetype,
            },
        });

        stream.on('error', (error) => {
            return res
                .status(400)
                .json({ message: 'Something went wrong while uploading file', error, status: 400 });
        });

        stream.on('finish', async () => {
            try {
                const { id } = req.user;
                const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

                const user = await User.updateOne({ _id: id }, { [`${folder}_image_url`]: url });

                if (!user) {
                    return res
                        .status(400)
                        .json({ message: "Couldn't update the profile", status: 400 });
                }

                res.status(200).json({
                    message: 'Uploaded and updated profile',
                    status: 200,
                });
            } catch (e) {
                return res
                    .status(500)
                    .json({ message: 'Something went wrong. Try again', status: 500 });
            }
        });
        stream.end(req.files[0].buffer);
    });
});

module.exports = router;
