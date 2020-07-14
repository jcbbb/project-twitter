const { Router } = require('express');
const env = process.env.NODE_ENV || 'dev';
const config = require(`../config/${env}`);
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sgApiKey);

const router = Router();

router.post('/verification', async (req, res) => {
    const { email, verificationCode } = req.body;

    const msg = {
        personalizations: [
            {
                to: [{ email }],
                dynamic_template_data: {
                    code: verificationCode,
                },
                subject: `${verificationCode} - Verification Code`,
            },
        ],
        from: {
            email: 'verify@twitter-doom.com',
            name: 'Twitter Doom Ltd.',
        },
        template_id: 'd-7fa3a0c0ec934da3b169e8d7c5b9b5ec',
    };

    try {
        await sgMail.send(msg);
        res.json({ message: 'Email sent successfully' });
    } catch (err) {
        return res.status(400).json({
            message: 'Something went wrong while sending email',
            status: 400,
            err: err.response.body.errors,
        });
    }
});

module.exports = router;
