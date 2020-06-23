const { Router } = require('express');
const { bucket } = require('../config/gcs');
const { v4 } = require('uuid');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
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

router.post('/profileMedia', verifyToken, upload.any(), async (req, res) => {
    const { folder } = req.body;
    req.files.forEach((file, index) => {
        const fileUpload = bucket.file(
            `${typeof folder !== 'string' || !folder instanceof String ? folder[index] : folder}/${v4()}${path.extname(
                file.originalname,
            )}`,
        );

        const stream = fileUpload.createWriteStream({
            predefinedAcl: 'publicRead',
            metadata: {
                contentType: file.mimetype,
            },
        });

        stream.on('error', (error) => {
            return res.status(400).json({ message: 'Something went wrong while uploading file', error, status: 400 });
        });

        stream.on('finish', async () => {
            try {
                const { id } = req.user;
                const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

                const user = await User.updateOne(
                    { _id: id },
                    {
                        [`${
                            typeof folder !== 'string' || !folder instanceof String ? folder[index] : folder
                        }_image_url`]: url,
                    },
                );

                // TODO: Update tweets to reflect new user profile photo

                if (!user) {
                    return res.status(400).json({ message: "Couldn't update the profile", status: 400 });
                }

                res.status(200).json({
                    message: 'Uploaded and updated profile',
                    status: 200,
                });
            } catch (e) {
                return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
            }
        });
        stream.end(file.buffer);
    });
});

router.post('/tweetMedia', verifyToken, upload.any(), async (req, res, next) => {
    const { folder } = req.body;
    const urls = [];

    await new Promise((resolve) => {
        req.files.forEach((file, index, arr) => {
            const fileUpload = bucket.file(`${folder}/${v4()}${path.extname(file.originalname)}`);

            const stream = fileUpload.createWriteStream({
                predefinedAcl: 'publicRead',
                metadata: {
                    contentType: file.mimetype,
                },
            });

            stream.on('error', (error) => {
                return res
                    .status(400)
                    .json({ message: 'Something went wrong while uploading file', error, status: 400 });
            });

            stream.on('finish', async () => {
                const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
                urls.push(url);
                if (urls.length === arr.length) resolve();
            });

            stream.end(file.buffer);
        });
    });

    try {
        const { id } = req.user;
        const user = await User.findById(id);

        const newTweet = new Tweet({
            text: 'Heyyy',
            user,
            media: { urls },
        });

        if (!newTweet) {
            return res.status(400).json({ message: 'Unable to create new tweet', status: 400 });
        }

        await newTweet.save();
        res.json({ message: 'Successfully created a new tweet', status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

module.exports = router;
