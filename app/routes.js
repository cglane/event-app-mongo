var User = require("./models/user");
var Events = require('./models/events.js');
var EventDate = require('./models/eventDates.js');
var _ = require('underscore');
var waterfall = require('async-waterfall');

// var NodeMail = require('./nodemailer.js');
// var Twilio = require('./sms.js')
module.exports = function (apiRoutes) {

  apiRoutes.get('/', function(req, res) {
  	res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  apiRoutes.get('/users', function(req, res) {
  	User.find({}, function(err, users) {
  		res.json(users);
  	});
  });
  apiRoutes.get('/getUserInfo/:userId', function(req, res) {
    var id = req.params.userId;
    User.findOne({_id:id}, function(err, user) {
      res.json(user);
    });
  });
  apiRoutes.get('/check', function(req, res) {
  	res.json(req.decoded);
  });
  apiRoutes.put('/updateprofile/:user_id',function(req,res){
    var id = req.params.user_id;
    User.findOne({_id:id},function(err,user){
      if(err) throw err;
      else{
        user.username= req.body.username;
        user.password=req.body.password;
        user.token = req.body.token;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.save(function(err,user){
          if(err)throw err;
          res.json({
            success:true,
            user:user
          })
        })
      }
    })
  });
  apiRoutes.post('/createevent/:user_id',function(req,res){
    var userId = req.params.user_id;
    var newEvent = new Events({
      eventTitle: req.body.eventTitle,
      admins:[userId],
      location:{
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip
      }
    });
    //check if name of event already exists for user
      User.findOne({_id:userId},{events:{$elemMatch:{eventTitle:req.body.eventTitle}}},function(err,user){
        if(err)throw err;
        if(!user.events.length){
          newEvent.save(function(err,eventRes){
            if(err)throw err;
            else{
              //if all goes well add event to user's local event array
                User.update({
                _id:userId
              },
              {
                $push:{events:{eventId:eventRes._id,admin:true,eventTitle:eventRes.eventTitle}}},
                function(err){
                  if(err) throw err;
                  res.send(eventRes)
                });
            }
          })
        }
      })

  });
  apiRoutes.get('/getevents/:userId',function(req,res){
    var userId = req.params.userId;
    var user = User.findOne({'_id':userId});
    var items = Events.find({'_id':{'$in':user.events}});
    User.findOne({'_id':userId},function(err,user){
      if(err)throw err;
      var eventIds = [];
      //get all eventIds
      _.each(user.events,function(el){
        eventIds.push(el.eventId)
      })
      //search Events by EventIds
      Events.find({_id:{$in:eventIds}},function(err,allEvents){
        res.send(allEvents)
      })
    })

  });
  //removes event from user event array and user from event collection
  apiRoutes.put('/deleteeventsuser/:userId/:eventId',function(req,res){
    var userId = req.params.userId;
    var eventId = req.params.eventId;
    //double call don't know if in user or admin
    Events.update({_id:eventId},{$pull:{'admins':userId}});
    Events.update({_id:eventId},{$pull:{'users':userId}});

    User.update({_id:userId},{
      $addToSet:{'events':eventId}
    },function(err){
      if(err) throw err;
      res.send({success:true})
    })
  });
  //add user to Event specify admin or regular userId
  apiRoutes.put('/addtoevent/:userId/:eventId/:bool',function(req,res){
    var userId = req.params.userId;
    var eventId = req.params.eventId;
    var bool = req.params.bool;
    if(bool === 'true'){
      Events.update({_id:eventId},{
        $addToSet:{'admins':userId}
      },function(err){
        if(err)throw err;
        User.update({_id:userId},{
          $addToSet:{'events':eventId}
        },function(err,user){
          if(err) throw err;
          res.send({succcess:true})
        })
      })
    }else{
      Events.update({_id:eventId},{
        $addToSet:{'users':userId}
      },function(err){
        if(err)throw err;
        User.update({_id:userId},{
          $addToSet:{'events':eventId}
        },function(err,user){
          if(err) throw err;
          res.send({succcess:true})
        })
      })
    }

  })

  //edit event
  apiRoutes.put('/editevent/:eventId',function(req,res){
    var eventId = req.params.eventId;
    var eventTitle = req.body.eventTitle;
    var date= req.body.date;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    Events.findByIdAndUpdate(
      eventId,
      {update: { $set:
        { 'eventTitle':eventTitle,
        'eventDate':date,
        'location.$.city':city,
        'location.$.state':state,
        'location.$.zip':zip
      }
    }
    },function(err){
      if(err)throw err;
      res.send({success:true,eventTitle:req.body.eventTitle})
    })
  })
  apiRoutes.post('/createeventdate/:eventId',function(req,res){
    var eventId = req.params.eventId;
    var data = req.body;
    var localDoc = new EventDate({
      title: data.title,
      date: data.date,
      textMsg:{
        bool:data.textMsg.bool,
        time:data.textMsg.time,
      },
      email:{
        bool:data.email.bool,
        time:data.email.time
      }
    })
    localDoc.save(function(err,object){
      if(err)throw err;
      else{
        Events.findByIdAndUpdate(eventId,{
          $push:{eventDates:object._id},
        },function(err){
          if(err)throw err;
          res.send({succcess:true,msg:'eventDate created and added to event',title:data.title})
        })
      }
    })
  })
  apiRoutes.get('/geteventdate/:eventId',function(req,res){
    var eventId = req.params.eventId;
    Events.findOne({_id:eventId},function(err,body){
      if(err)throw err;
      else{
        var eventDateIds = [];
        //get all eventIds
        _.each(body.eventDates,function(el){
          eventDateIds.push(el)
        })
        //search Events by EventIds
        EventDate.find({_id:{$in:eventDateIds}},function(err,allEventDates){
          res.send(allEventDates)
        })
      }
    })
  })
  apiRoutes.put('/updateeventdate/:eventdateId',function(req,res){
    var eventDateId = req.params.eventdateId;
    var data = req.body;
    EventDate.findByIdAndUpdate(eventDateId,{
      update:{$set:{
        'title':data.title,
        'date':data.date,
        'textMsg.$.bool':data.textMsg.bool,
        'textMsg.$.time':data.textMsg.time,
        'email.$.bool':data.email.bool,
        'email.$.time':data.email.time
      }}
    },function(err,object){
      if(err)throw err;
      res.send(object);
    })
  })
  apiRoutes.delete('/deleteeventdate/:eventDateId/:eventId',function(req,res){
    var eventDateId = req.params.eventdateId;
    var eventId = req.params.eventId;
    EventDate.findByIdAndRemove(eventDateId,function(err){
      if(err) throw err;
      else{
        Events.findByIdAndUpdate(eventId,{
          update:{
            $pull:{'eventDates':eventId}
          }
        },function(err,body){
          if(err)throw err;
          res.send(body);
        })
      }
    })
  })
  apiRoutes.post('/sendemail/:eventId',function(req,res){
    var eventId = req.params.eventId;
    var emailBody = req.body.emailBody;
    var subject = req.body.emailSubject;
    var recipients;
    //find all attendee id's
    Events.findOne({_id:eventId},function(err,body){
      recipients = body.admins.concat(body.users);
      //search for user emails
      User.find({_id:{$in:recipients}},function(err,allUsers){
        if(err)throw err;
        _.each(allUsers,function(el){
          require('./nodemailer.js')(el.email,subject,emailBody);
        })
      })
    })
  })
  apiRoutes.post('/sendtext/:eventId',function(req,res){
    var eventId = req.params.eventId;
    var textBody = req.body.textBody;
    console.log(textBody,'textBody')
    var recipients;
    //find all attendee id's
    Events.findOne({_id:eventId},function(err,body){
      recipients = body.admins.concat(body.users);
      //search for user phone number
      User.find({_id:{$in:recipients}},function(err,allUsers){
        if(err)throw err;
        _.each(allUsers,function(el){
          require('./sms.js')(el.phone,textBody);
        })
      })
    })
  })
}
