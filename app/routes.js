var User = require("./models/user");
var Events = require('./models/events.js');
var EventDate = require('./models/eventDates.js');
var _ = require('underscore');
var waterfall = require('async-waterfall');
var timer = require('./timers.js');
var mongoose = require('mongoose');
var Promise = require('es6-promise').Promise;


// var NodeMail = require('./nodemailer.js');
// var Twilio = require('./sms.js')

//return a promise so that res of api call is within scope
var addToEvent = function(eventId,userId,admin,callback){
  return new Promise(function(success, fail) {
    Events.findOne({_id:eventId}).exec(function(err,event){
      event[admin].push(mongoose.Types.ObjectId(userId));
      event.save(function(err,newEvent){
        if(err){
          fail(err)
        }else{
          success(newEvent)
        }
      })
    });
  });
}
var addUpUsers = function(eventObject){
  var users = [];
  if(eventObject.admins){
    _.each(eventObject.admins,function(el){
      users.push(parseInt(el));
    })
  }
  if(eventObject.users){
    _.each(eventObject.users,function(el){
      users.push(parseInt(el));
    })
  }
  return users;
}
var addUpUserId = function(eventObject){
  var users = [];
  if(eventObject.admins){
    _.each(eventObject.admins,function(el){
      users.push(el);
    })
  }
  if(eventObject.users){
    _.each(eventObject.users,function(el){
      users.push(el);
    })
  }
  return users;
}
var addToEventUserExists = function(eventId,userId,admin,callback){
  return new Promise(function(success, fail) {
      Events.findOne({_id:eventId},function(err,event){
          if(err) throw err;
          var users = addUpUsers(event);
          if(!_.contains(users,parseInt(userId))){
              addToEvent(eventId,userId,admin,callback)
                .then(function(data){
                  success(data)
                }).catch(function(error){
                  console.error(error)
                })
            }else{
              success({success:false,content:'user already exists'})
            }
        });
      });
};
module.exports = function (apiRoutes,jwt,app) {

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
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.lastName = req.body.lastName;
        user.firstName = req.body.firstName;
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
  apiRoutes.put('/updateuser/:user_id',function(req,res){
    var id = req.params.user_id;
    User.findOne({_id:id},function(err,user){
      if(err) throw err;
      else{
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.lastName = req.body.lastName;
        user.firstName = req.body.firstName;
        user.save(function(err,user){
          if(err) throw err;
          res.json({
            success:true,
            user:user
          })
        })
      }
    })
  })
  apiRoutes.post('/createevent/:user_id',function(req,res){
    var userId = req.params.user_id;
    var newEvent = new Events({
      eventTitle: req.body.eventTitle,
      admins:[userId],
      users:[],
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
  apiRoutes.get('/geteventusers/:eventId',function(req,res){
    var eventId = req.params.eventId;
    Events.findOne({'_id':eventId},function(err,event){
      if(err) throw err;
      User.find({_id:{$in:addUpUserId(event)}},function(err,allUsers){
        if(err)throw err;
        res.send(allUsers)
      })
    })
  })
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
  apiRoutes.put('/invitetoevent/:eventId/:bool',function(req,res){
    var eventId = req.params.eventId;
    var bool = req.params.bool;
    var text = req.params.text;
    var nick = new User({
      username: req.body.email,
      password: 'newPassword',
      email: req.body.email,
      phone: req.body.phone,
    });
    User.find({username:req.body.email},function(err,user){
      if(err) throw err;
      console.log(!user.length,'user.length')
      if(!user.length){
        nick.save(function(err,body){
          if(err) throw err;
          console.log('User'+body.username+'saved successfully');
          var token = jwt.sign(body,app.get('superSecret'),{
            expiresIn:86400
            })
            if(bool === 'true'){
              //add to event as admin
              //add event to user events array
              addToEvent(eventId,body._id,'admins')
                .then(res.send.bind(res))
                .catch(console.error);

            }else{
              //add to event as user
              //add event to user events array
              addToEvent(eventId,body._id,'users')
              .then(res.send.bind(res))
              .catch(console.error);
            }
        })
      }else{
        //user already exists adding them to event list
          if(bool === 'true'){
            //checks if user already invited
            addToEventUserExists(eventId,user[0]._id,'admins')
            .then(res.send.bind(res))
          }else{
            addToEventUserExists(eventId,user[0]._id,'users')
              .then(res.send.bind(res))
              .catch(console.error)
          }
      }
    })
  })
  //add user to Event specify admin or regular userId
  apiRoutes.put('/addtoevent/:userId/:eventId/:bool',function(req,res){
    var userId = req.params.userId;
    var eventId = req.params.eventId;
    var bool = req.params.bool;
    if(bool === 'true'){
      addToEvent(eventId,userId,'admins')
    }else{
      addToEvent(eventId,userId,'users')
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
        'date':date,
        'location.$.city':city,
        'location.$.state':state,
        'location.$.zip':zip
      }
    }
  },function(err,thisEvent){
      if(err)throw err;
      res.send(thisEvent)
    })
  })
  apiRoutes.post('/createeventdate/:eventId',function(req,res){
    var eventId = req.params.eventId;
    var data = req.body;
    var localDoc = new EventDate({
      title: data.title,
      start: data.start,
      end:data.end,
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
        timer.setSchedule(object,eventId);
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
  apiRoutes.put('/updateeventdate/:eventdateId/:eventId',function(req,res){
    var eventDateId = req.params.eventdateId;
    var eventId = req.params.eventId;
    var textBool = (req.body.textMsg.bool === 'true')? true:false;
    var emailBool = (req.body.email.bool === 'true')? true:false;
    var updatedObj = {
      'title':req.body.title,
      'start':req.body.start,
      'end':req.body.end,
      'textMsg':{
        'bool':textBool,
        'time':req.body.textMsg.time
      },
      'email':{
        'bool':emailBool,
        'time':req.body.email.time
      }
    }
    EventDate.findByIdAndUpdate(
        eventDateId,
        updatedObj,
        {new: true},
      function(err,object){
        if(err)throw err;
        timer.setSchedule(object,eventId)
        res.send(object)
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
  apiRoutes.post('/sendtextinvite',function(req,res){
    var phone = req.body.phone;
    // var eventName = req.body.eventName;
    var username = req.body.username;
    var password = 'newPassword'
    var textBody = "You have been invited to an event. http://localhost:3030/register Sign in with the username: "+username+' and password: '+password;
    require('./sms.js')(phone,textBody)
    res.send('text message sent')
  })

}
