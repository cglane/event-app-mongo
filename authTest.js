
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('./config');
// var request = require('request')
describe('Routing', function() {
  var url = 'http://localhost:8080';
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImVtYWlsIjoiZGVmYXVsdCIsInBob25lIjoiZGVmYXVsdCIsImV2ZW50cyI6ImluaXQiLCJfX3YiOiJpbml0IiwiYWRtaW4iOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6eyJlbWFpbCI6dHJ1ZSwicGhvbmUiOnRydWV9LCJpbml0Ijp7ImV2ZW50cyI6dHJ1ZSwiX192Ijp0cnVlLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6eyJzYXZlIjpbbnVsbCxudWxsXSwiaXNOZXciOltudWxsLG51bGxdfSwiX2V2ZW50c0NvdW50IjoyLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJlbWFpbCI6IiIsInBob25lIjoiIiwiZXZlbnRzIjpbXSwiX192IjoxLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiIkMmEkMTAkMHlmT0ZzVVQxak05QXFsS2FJanU5LmJlbVN4VnhDSmo5ZFVZMGM1eHdiUFZmT3RjeGpVbEMiLCJ1c2VybmFtZSI6ImhhcmxlcyIsIl9pZCI6IjU2ZWMyY2Q2OWIyZDU1YmRlNjJjNWZhZCJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDU4NTcxNjQ2LCJleHAiOjE0NTg2NTgwNDZ9.Oj3JXmcvHt9Jpva0lu9w4gY4kK76nI8yQZ8cNNTxt00"  // within before() you can run all the operations that are needed to setup your tests. In this case
  // I want to create a connection with the database, and when I'm done, I call done().
  before(function(done) {
    mongoose.connect(config.database);
    done();
  });
  // use describe to give a title to your test suite, in this case the tile is "Account"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('Authorization', function(done) {

    it('should return error trying to save duplicate username', function(done) {
      var profile = {
        name: 'charles',
        password: 'me'
      };
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
    request(url)
	.post('/register')
	.send(profile)
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(500);
          // console.log(res.text,'hello')
          // console.log('my name is charles and who are you')
          // this is should.js syntax, very clear
          // res.should.have.property('status', 400);
          done();
        });
    });

    it('should return error accessing users without authorization', function(done) {

    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
    request(url)
    .get('/api/users')

    // end handles the response
  .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(403);

          // this is should.js syntax, very clear
          // res.should.have.property('status', 400);
          done();
        });
    });
  });
  describe('Api', function() {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImVtYWlsIjoiZGVmYXVsdCIsInBob25lIjoiZGVmYXVsdCIsImV2ZW50cyI6ImluaXQiLCJfX3YiOiJpbml0IiwiYWRtaW4iOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6eyJlbWFpbCI6dHJ1ZSwicGhvbmUiOnRydWV9LCJpbml0Ijp7ImV2ZW50cyI6dHJ1ZSwiX192Ijp0cnVlLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6eyJzYXZlIjpbbnVsbCxudWxsXSwiaXNOZXciOltudWxsLG51bGxdfSwiX2V2ZW50c0NvdW50IjoyLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJlbWFpbCI6IiIsInBob25lIjoiIiwiZXZlbnRzIjpbXSwiX192IjoxLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiIkMmEkMTAkMHlmT0ZzVVQxak05QXFsS2FJanU5LmJlbVN4VnhDSmo5ZFVZMGM1eHdiUFZmT3RjeGpVbEMiLCJ1c2VybmFtZSI6ImhhcmxlcyIsIl9pZCI6IjU2ZWMyY2Q2OWIyZDU1YmRlNjJjNWZhZCJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDU4NTcxNjQ2LCJleHAiOjE0NTg2NTgwNDZ9.Oj3JXmcvHt9Jpva0lu9w4gY4kK76nI8yQZ8cNNTxt00"
    var events =
      {
        title: 'Sarah and John',
        users:['12345678','1234567'],
        date: Date.now(),
        location:{
          city: 'Charleston',
          state:'SC',
          zip:'29401'
        },
        pictures:[],
        eventDates:[]
      };

    var user = {
        _id:"56ec2cd69b2d55bde62c5fad",
        username: 'charles',
        password: 'me',
        email:'charleslane23@gmail.com',
        phone:'18436479951',
      events:{
        '56ec2cd69b2d57bde62c5fad' : 'true',
        '56ec2cd69b2d58bde62c5fad': 'false'
      }
    };
    var eventDate = {
      title:'It is raining go inside',
      date: 1458228403808,
      text:{
        bool: true,
        time: 1800000
      },
      email:{
        bool: true,
        time: 1800000
      },
    }

    it('should allow access with token', function(done) {
    request(url)
    .get('/api/users')
    .set('x-access-token',token)
    //set token
    // end handles the response
    .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.be.equal(200);

          // this is should.js syntax, very clear
          // res.should.have.property('status', 400);
          done();
        });
    });
    it('should allow charles to login', function(done) {

      var profile = {
        username: user.username,
        password: user.password
      };
    request(url)
    .post('/api/authenticate')
    .send(profile)
    //set token
    // end handles the response
    .end(function(err, res) {
          if (err) {
            throw err;
          }
          // res.status.should.be.equal(200);
          var items = JSON.parse(res.text);
          assert(items.username == "charles")
          done();
        });
    });
    it('should allow charles to update information', function(done) {

    request(url)
    .put('/api/updateprofile/'+user._id)
    .set('x-access-token',token)
    .send(user)
    //set token
    // end handles the response
    .end(function(err, res) {
          if (err) {
            throw err;
          }
          var items = JSON.parse(res.text);
          // res.status.should.be.equal(200);
          assert(items.user.username == 'charles')
          // console.log(res.text)
          // assert(res.text.email == 'charleslane23@gmail.com')


          // this is should.js syntax, very clear
          // res.should.have.property('status', 400);
          done();
        });
    });


    it('should be able to create event', function(done) {
    request(url)
    .post('/api/createevent/'+user._id)
    .set('x-access-token',token)
    .send(events)
    //set token
    // end handles the response
    .end(function(err, res) {
          if (err) {
            throw err;
          }
          var items = JSON.parse(res.text);
          assert(items.title == 'Sarah and John')
          // this is should.js syntax, very clear
          // res.should.have.property('status', 400);
          done();
        });
    });
    it('should show charles is invited to event', function(done) {
    request(url)
    .get('/api/events/'+user._id)
    .set('x-access-token',token)

    //set token
    // end handles the response
    .end(function(err, res) {
          if (err) {
            throw err;
          }
          var items = JSON.parse(res.text);
          res.status.should.be.equal(200);
          assert(items.title == 'Sarah and John')
          // this is should.js syntax, very clear
          // res.should.have.property('status', 400);
          done();
        });
    });
    it('should be able to create eventDate', function(done) {
    request(url)
    .post('/api/eventsDates/'+event._id)
    .set('x-access-token',token)
    .send(events)
    //set token
    // end handles the response
    .end(function(err, res) {
          if (err) {
            throw err;
          }
          var items = JSON.parse(res.text);
          res.status.should.be.equal(200);
          assert(items.title == 'It is raining go inside')
          // this is should.js syntax, very clear
          // res.should.have.property('status', 400);
          done();
        });
    });
});
});
