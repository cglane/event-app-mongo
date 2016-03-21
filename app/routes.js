var User = require("./models/user");
var Events = require('./models/events.js');
var EventDates = require('./models/eventDates.js')
module.exports = function (apiRoutes) {

  apiRoutes.get('/', function(req, res) {
  	res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  apiRoutes.get('/users', function(req, res) {
  	User.find({}, function(err, users) {
  		res.json(users);
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
}
