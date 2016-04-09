// TODO: make setupAuth depend on the Config service...
function setupAuth(User, app,jwt) {
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  var Config = require('../config.js');
  var GoogleContacts = require('google-contacts-api');

  var globalUser;
  var token;
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
      clientID: Config.facebookAuth.clientID,
      clientSecret: Config.facebookAuth.clientSecret,
      callbackURL: Config.facebookAuth.callbackURL,
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
          if(userDat){
            globalUser = userDat;
            token = jwt.sign(userDat, app.get('superSecret'), {
              expiresIn: 86400 // expires in 24 hours
            });
          }else{
            var nick = new User({
              username:user.email,
              password:user.password,
            });
            nick.save(function(err,body) {
              if (err) throw err;
              console.log('User saved successfully');
              //authenticating user
              token = jwt.sign(body, app.get('superSecret'), {
                expiresIn: 86400 // expires in 24 hours
              });
              //returning user object
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

    app.get('/facebook/me',function(req,res){
      console.log('greate success');
      res.send({global:globalUser,token:token})
    })
  ///////////GOOGLE///////////////////////////////////////////////////////////////////////////////////
//     passport.use(new GoogleStrategy({
//
//     clientID        : Config.googleAuth.clientID,
//     clientSecret    : Config.googleAuth.clientSecret,
//     callbackURL     : Config.googleAuth.callbackURL,
//
// },
// function(token, refreshToken, profile, done) {
//   console.log(token,'token')
  // console.log(token,'token')
  // console.log(refreshToken,'refreshToken')
  // var client = require('gdata-js')(Config.googleAuth.clientID, Config.googleAuth.clientSecret);
  // var refresh = '1/zo_VgMe1Bot_OuWCAlKPibhhyT_eQI2AaAqzhqjWHpAMEudVrK5jSpoR30zcRFq6'
  // client.setToken({ access_token: token, refresh_token: refreshToken });
  // client.getFeed('https://www.google.com/m8/feeds/contacts/default/full', function (err, result) {
  //   console.log(result)
  // });
//   var contacts = new GoogleContacts({ token : 'ya29..vwKTqETBEZ0tw_L3kJcFA7X439aAsFlBfO2AmiZwVwjoDMcIRy_VjuUhaRH6IORz_A' });
//   contacts.getContacts(function(err, contacts) {
//       console.log(contacts,'contacts')
//   });
//
// }));
// var contacts = new GoogleContacts({ token : 'ya29..vwKTqETBEZ0tw_L3kJcFA7X439aAsFlBfO2AmiZwVwjoDMcIRy_VjuUhaRH6IORz_A' });
// contacts.getContacts(function(err, contacts) {
//     console.log(contacts,'contacts')
// });
// var address = 'https://www.google.com/m8/feeds/contacts/default/full?alt=json&oauth_token=ya29..vgKctRcaRGi1G0-CuB-qdSmwDWOxgDt_JuElmSX3gkT58lio2k6hxAhr_3W-k2szzg'
// var token = 'ya29..vgKctRcaRGi1G0-CuB-qdSmwDWOxgDt_JuElmSX3gkT58lio2k6hxAhr_3W-k2szzg'
// app.get('/auth/google', passport.authenticate('google', { scope:
//                                       ['https://www.googleapis.com/auth/userinfo.profile',
//                                       'https://www.googleapis.com/auth/userinfo.email'],
//                                       access_type: 'offline', approval_prompt: 'force' }));
//
//     // the callback after google has authenticated the user
//     app.get('/auth/google/callback',
//             passport.authenticate('google', {
//                     successRedirect : '/#/events/users',
//                     failureRedirect : '/#/'
//             }));
}

module.exports = setupAuth;
