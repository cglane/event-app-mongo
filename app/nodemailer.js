
var nodemailer = require('nodemailer');

module.exports = function(recipient,subject,textContent){


  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://nodemail12%40gmail.com:mywebapp@smtp.gmail.com');
  console.log(recipient,'recipient')
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Sarah 👥" <foo@blurdybloop.com>',
      to: recipient, // list of receivers
      subject: subject, // Subject line
      text: textContent, // plaintext body
      html: '<b>'+textContent+'</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}
