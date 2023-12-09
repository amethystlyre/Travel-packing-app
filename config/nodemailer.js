const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'r2zero709@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
    }
});

module.exports = mailTransporter;

