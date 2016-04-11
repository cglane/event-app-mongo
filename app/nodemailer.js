

var nodemailer = require('nodemailer');
var config = require('../config.js')
module.exports = function(recipient,subject,content){
      // Not the movie transporter!
      console.log(recipient,subject,content)
      var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: config.emailAuth.user, // Your email id
              pass: config.emailAuth.password // Your password
          }
      });
      var mailOptions = {
      from: '"Event App 👥" <foo@blurdybloop.com>', // sender address
      to: recipient, // list of receivers
      subject: subject, // Subject line
      text: content //, // plaintext body
      // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return error
    }else{
        return info.response
    };
  });


}
