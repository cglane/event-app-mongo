var User = require("./models/user");
var Events = require('./models/events.js');
var EventDate = require('./models/eventDates.js')
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
        user.save(function(err,user){
          if(err)throw err;
          console.log('user saved successfully');
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
        console.log(user.events.length,'user')
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
                  res.json({ success: true, message: 'event saved and added to user arrray' });
                  console.log('event added to user array')
                });
            }
          })
        }
      })

  });
  apiRoutes.get('/getevents/:userId',function(req,res){
    var userId = req.params.userId;
    //find all events in user array then grab information about all events
    User.aggregate([
      {$match:{_id:userId}},
      { $unwind : "$events" },
      {
        $group:{
          _id: {"eventId":"$eventId"}
        }
      }
    ],function(err,result){
      if(err) throw err;
      console.log(result,'result')
      res.send(result)
    })
  });
  //removes event from user event array
  apiRoutes.put('/deleteevents/:userId/:eventId',function(req,res){
    var userId = req.params.userId;
    var eventId = req.params.eventId;
    User.update({_id:userId},{
      $pull:{'events':{'eventId':eventId}}
    },function(err){
      if(err) throw err;
      res.send({success:true})
    })
  });
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
      console.log(object,'object')
      res.send(object);
    })
  })
  apiRoutes.delete('/deleteeventdate/:eventDateId/:eventId',function(req,res){
    var eventDateId = req.params.eventdateId;
    var eventId = req.params.eventId;
    EventDate.findByIdAndRemove(id,function(err){
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
}
