

module.exports = function(phone,content){


  var accountSid = 'AC74220d4ec4d2dbf61b8746c489a6e89a';
  var authToken = "c87e74cb487a5319e20f153a9bff30d4";
  var client = require('twilio')(accountSid, authToken);
  client.messages.create({
      body: content,
      to: phone,
      from: "+18434106364"
  }, function(err, message) {
    if(err){
      console.log(err)
    }else{
      console.log(message.body)
    }
      // process.stdout.write(message.sid);
  });
}
