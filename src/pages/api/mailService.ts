import {EMAIL} from '../../web-data/constants'

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  });

function sendMail(req) {
    var mailOptions = {
        from: req.from,
        to: req.to,
        subject: req.subject,
        text: req.text
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function sendHtmlMail(req) {

    var mailOptions = {
        from: req.from,
        to: req.to,
        subject: req.subject,
        text: req.text
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

