var schedule = require('node-schedule');
var Events = require('./models/events.js');
var User = require('./models/user.js');
var _ = require('underscore')
var moment = require('moment')
//create timed event


module.exports = {

  setSchedule:function(eventDateObject,eventId){
    //deleting previously set eventHandlers if they exist
    if (global[eventDateObject._id + 'text'] != undefined) {
      global[eventDateObject._id + 'text'].cancel()
    }
    if(global[eventDateObject._id + 'email']!= undefined){
      global[eventDateObject._id + 'email'].cancel()
    }
    //set new schedule objects
  var startDate = eventDateObject.start;
  var textDate = new Date(startDate.getTime() - eventDateObject.textMsg.time);
  var emailDate = new Date(startDate.getTime() - eventDateObject.email.time);

console.log(new Date(Date.now() + 1500),'time')
var time = new Date(Date.now()+1500)
console.log(textDate,'text time')
//if bool true send text at right time
  if(eventDateObject.textMsg.bool = 'true'){
    global[eventDateObject._id + 'text'] = schedule.scheduleJob(textDate,function(){
      var recipients;
      //find all attendee eventId's
      Events.findOne({_id:eventId},function(err,body){
        if(err)throw err;
        recipients = body.admins.concat(body.users);
        //search for user phone number
        User.find({_id:{$in:recipients}},function(err,allUsers){
          if(err)throw err;
          _.each(allUsers,function(el){
            require('./sms.js')(el.phone,eventDateObject.title);
          })
        })
      })
    })
  }

  //sending email if bol is true, setting variabl name to a
  //*concatenation of the object id and a key word
  if(eventDateObject.email.bool = 'true'){
      global[eventDateObject._id + 'email'] = schedule.scheduleJob(emailDate,function(){
        var recipients;
        Events.findOne({_id:eventId},function(err,body){
          recipients = body.admins.concat(body.users);
          //search for user emails
          User.find({_id:{$in:recipients}},function(err,allUsers){
            if(err)throw err;
            _.each(allUsers,function(el){
              require('./nodemailer.js')(el.email,'Event Reminder',eventDateObject.title);
            })
          })
        })
      })
  }
},
  // removeSchedule:function(eventDateObject,eventId){
  //
  // }
  //
  //

}
