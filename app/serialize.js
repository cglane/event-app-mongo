// TODO: make setupAuth depend on the Config service...
function setupAuth(User, app,jwt) {
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var Config = require('../config.js')
  var globalUser;
  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.
      findOne({ _id : id }).
      exec(done);
  });

  // Facebook-specific
  passport.use(new FacebookStrategy(
    {
      clientID: '1982378175320711',
      clientSecret: '7efd322126db55949ade4877ce99e027',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      // Necessary for new version of Facebook graph API
      profileFields: ['id', 'emails', 'name']
    },
    function(accessToken, refreshToken, profile, done) {
      if (!profile.emails || !profile.emails.length) {
        return done('No emails associated with this account!');
      }

      User.findOneAndUpdate(
        { 'username': profile.emails[0].value },
        {
          $set: {
            'username': profile.emails[0].value,
            'email':profile.emails[0].value,
            'password':profile.id
          }
        },
        { 'new': true, upsert: true, runValidators: true },
        function(error, user) {
          done(error, user);
        });
    }));

  // Express middlewares
  app.use(require('express-session')({
    secret: 'this is a secret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());



  // Express routes for auth
  app.get('/auth/facebook',
    function(req, res, next) {
      var redirect = encodeURIComponent(req.query.redirect || '/');
      passport.authenticate('facebook',
        {
          scope: ['email'],
          callbackURL: 'http://localhost:3000/auth/facebook/callback?redirect=' + redirect
        })(req, res, next);
    });

  app.get('/auth/facebook/callback',
    function(req, res, next) {
      var url = 'http://localhost:3000/auth/facebook/callback?redirect=' +
        encodeURIComponent(req.query.redirect);
      passport.authenticate('facebook', { callbackURL: url },function(err,user){
        //find if user already added if not authenticate and add to users database
        User.findOne({username:user.email},function(err,userDat){
          console.log(userDat,'userDat')
          if(!userDat){
            res.json({success:'user alreay exists'})
          }else{
            var nick = new User({
              username:user.email,
              password:user.password,
            });
            nick.save(function(err,body) {
              if (err) throw err;
              console.log('User saved successfully');
              globalUser = body;
            });
          }
        })
        next()
      })(req, res, next);
    },
    function(req, res) {
      res.redirect(req.query.redirect);
    });

    app.get('/api/v1/me',function(req,res){
      console.log('greate success')
      res.send(globalUser)
    })
  // Express routes for auth
  // app.get('/auth/facebook',
  //   passport.authenticate('facebook', { scope: ['email'] }));
  //
  // app.get('/auth/facebook/callback', function(req, res, next) {
  //   passport.authenticate('facebook', function(err, guy, info) {
  //       if (err) { return next(err); }
  //       if (!guy) { return res.redirect('/'); }
  //       console.log(guy,'guy')
  //       // find the user
  //       User.findOne({
  //         username: guy.username
  //       }, function(err, user) {
  //
  //         if (err) throw err;
  //
  //         if (!user) {
  //           res.json({ success: false, message: 'Authentication failed. User not found.' });
  //         } else {
  //             var token = jwt.sign(user, app.get('superSecret'), {
  //               expiresIn: 86400 // expires in 24 hours
  //             });
  //             console.log(token,'token');
  //             // res.json({success:true})
  //             // return res.redirect('http://localhost:8080/#/facebook/'+token+'/'+user._id);
  //             return res.redirect('/#/main')
  //           }
  //       });
  //       })(req, res, next);
  //     });
}

module.exports = setupAuth;
