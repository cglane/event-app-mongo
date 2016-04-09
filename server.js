// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var methodOverride = require('method-override');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport = require('passport')

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
var publicFolder = __dirname + '/public';

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
//config response for server

//all CORS,neccesary for ionic app
// app.use(function(req, res, next) {
//   res.append('Access-Control-Allow-Origin',req.headers.origin || '*');
//   res.append('Access-Control-Allow-Credentials','true');
//   res.append('Access-Control-Allow-Methods',['GET', 'OPTIONS','PUT','POST']);
//   res.append('Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(methodOverride());

// ## CORS middleware
//
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization,x-access-token');
    res.header('Access-Control-Allow-Credentials', 'true');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
//routes that do not require tokens
require('./app/serialize.js')(User,app,jwt)
require('./app/noauthRoutes.js')(app,User,publicFolder,passport,jwt);
require('./app/gContacts.js')();
// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

//authenticate with token
require("./app/authenticate.js")(apiRoutes,jwt,app)
//routes that require token authentication
require('./app/routes.js')(apiRoutes,jwt,app)
//adding prefix of api to all fo these routes
app.use('/api', apiRoutes);
// ===============================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
