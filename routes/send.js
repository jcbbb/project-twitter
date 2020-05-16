const { Router } = require('express');
const nodemailer = require('nodemailer');

const router = Router();

const transport = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'fred54@ethereal.email',
        pass: 'Uu5aKhcwew9bvk9wRq',
    },
};

const transporter = nodemailer.createTransport(transport);

router.post('/verification', async (req, res) => {
    const { email, verificationCode } = req.body;

    const mail = {
        from: 'Twitter Inc.',
        to: email,
        subject: `${verificationCode} - Verification code`,
        html: `<div width: 400px; margin: auto;">
                <h2>Confirm your email address</h2>
                <p>
                    One more step before you create your account on Twitter.
                    We want to make sure that you entered a correct email address.
                </p>
                <br />
                <p>Enter verification code to start using Twitter:</p>
                <h1>${verificationCode}</h1>
                <p>Code will not work after 1 hour</p>
                <br />
                <p>Thank you!</p>
                <p>Twitter</p>
        </div>`,
    };

    try {
        await transporter.sendMail(mail);
        res.json({ message: 'Email sent successfully' });
    } catch (err) {
        return res.status(400).json({
            message: 'Something went wrong while sending email',
            status: 400,
        });
    }
});

module.exports = router;
