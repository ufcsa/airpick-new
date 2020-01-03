const nodemailer = require('nodemailer');

const authInfo = require('./mail.config')

const sendAddRequestMail = (targetEmail) => {
    var mailOptions = {
        from: 'Lutong',
        to: targetEmail,
        subject: 'email from Lutong',
        text: 'cnm',
        html: 'Message from: ' + 'Lutong' + '<br></br> Email: ' + 'aa1264126181@gmail.com' + '<br></br> Message: ' + 'cnm',
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

}

module.exports = sendAddRequestMail;