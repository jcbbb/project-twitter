const { Router } = require('express');
const nodemailer = require('nodemailer');

const router = Router();

const transport = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'seth.fritsch@ethereal.email',
        pass: '89Zw8h5C3GqXZN4FAv',
    },
};

const transporter = nodemailer.createTransport(transport);

router.post('/confirmation', async (req, res) => {
    const { email, verificationCode } = req.body;

    const mail = {
        from: 'Twitter Inc.',
        to: email,
        subject: `${verificationCode} - Confirmation code`,
        html: `<div width: 400px; margin: auto;">
                <h2>Confirm your email address</h2>
                <p>
                    One more step before you create your account on Twitter.
                    We want to make sure that you entered a correct email address.
                </p>
                <br />
                <p>Enter confirmation code to start using Twitter:</p>
                <h1>${verificationCode}</h1>
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
