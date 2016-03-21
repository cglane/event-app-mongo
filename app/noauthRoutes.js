//
function checkUsers(req,res,User){
  User.find({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if(!user.length){
      next();
    }else{
      res.send({success: false, msg: 'Username already exists.'});
    }
  })
}

module.exports = function(app,User,publicFolder){
  app.post('/register', function(req, res) {

  	// create a sample user
  	var nick = new User({
  		username: req.body.username,
  		password: req.body.password,
  	});
    User.find({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
      if(!user.length){
        nick.save(function(err) {
          if (err) throw err;
          console.log('User saved successfully');
          res.json({ success: true,
           });
        });
      }else{
        res.send({success: false, msg: 'Username already exists.'});
      }
    })

  });

  // basic route (http://localhost:8080)
  app.get('/', function(req, res) {
  	res.send('Hello! The API is at http://localhost:' + port + '/api');
  });
  app.get('*', function (req, res) {
      res.sendFile(publicFolder); // load the single view file (angular will handle the page changes on the front-end)
  });
}
