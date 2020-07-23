const { Router } = require('express');
const env = process.env.NODE_ENV || 'dev';
const config = require(`../config/${env}`);
const Mailgun = require('mailgun-js');

const mailgun = new Mailgun({
    apiKey: config.mgApiKey,
    domain: 'verify.juraev.codes',
});

const router = Router();

router.post('/verification', async (req, res) => {
    const { email, verificationCode } = req.body;

    const msg = {
        from: 'Twitter Doom <verify@twitter-doom.com>',
        to: email,
        subject: `Verification code - ${verificationCode}`,
        template: 'verify',
        'v:code': verificationCode,
    };

    try {
        const response = await mailgun.messages().send(msg);
        res.json({ message: 'Email sent successfully' });
    } catch (err) {
        return res.status(400).json({
            message: 'Something went wrong while sending email',
            status: 400,
        });
    }
});

module.exports = router;
