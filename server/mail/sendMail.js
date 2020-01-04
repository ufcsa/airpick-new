const nodemailer = require('nodemailer');
const authInfo = require('./mail.config');

const sendMail = (recipent, subject, body) => {
    var mailOptions = {
        from: authInfo.user,
        to: recipent,
        subject: subject,
        html: body,
    };

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: authInfo,
    });

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(res));
        }
    });

};

module.exports = sendMail;


