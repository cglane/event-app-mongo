// TODO: make setupAuth depend on the Config service...
function setupAuth(User, app,jwt) {
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var Config = require('../config.js')
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
      callbackURL: 'http://localhost:8080/auth/facebook/callback',
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
    passport.authenticate('facebook', { scope: ['email'] }));

  app.get('/auth/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, guy, info) {
        if (err) { return next(err); }
        if (!guy) { return res.redirect('/'); }
        console.log(guy,'guy')
        // find the user
        User.findOne({
          username: guy.username
        }, function(err, user) {

          if (err) throw err;

          if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
          } else {
            console.log(user,'user')
              var token = jwt.sign(user, app.get('superSecret'), {
                expiresIn: 86400 // expires in 24 hours
              });
              console.log(token,'token');
              res.json({success:true,})
              return res.redirect('http://localhost:8080/#/facebook/'+token+'/'+user._id);
            }
        });
        })(req, res, next);
      });
}

module.exports = setupAuth;
