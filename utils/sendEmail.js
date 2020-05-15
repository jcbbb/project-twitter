const nodemailer = require('nodemailer');
const { USER, PASSWORD } = require('../config/secrets');

const transport = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: USER,
        password: PASSWORD,
    },
};

nodemailer.createTransport(transport);

const sendEmail = (to, message, subject) => {
    const mail = {
        from: 'TWitter Inc.',
        to,
        subject,
        text: message,
    };

    transporter.sendMail(mail, (err, data) => {
        if (err) return res.json({ message: 'Error sending email' });
    });
};

module.exports = {
    sendEmail,
};
