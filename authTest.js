
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('./config');
// var request = require('request')
// describe('Routing', function() {
//   var url = 'http://localhost:8080';
  // I want to create a connection with the database, and when I'm done, I call done().
  // before(function(done) {
  //   mongoose.connect(config.database);
  //   console.log('hello')
  //   done();
  // });
  // use describe to give a title to your test suite, in this case the tile is "Account"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
//   var token;
//   var user = {
//     username:'node',
//     password:'node'
//   }
//   var url = 'http://localhost:8080';
//
//   describe('Authorization', function(done) {
//     before(function(done) {
//       mongoose.connect(config.database);
//       console.log('hello')
//       done();
//     });
//     before(function (done) {
//      console.log("before");
//      request(url)
//      .post('/register', user)
//      .set('Accept', 'application/json')
//      .end(function (error, res) {
//         var items = JSON.parse(res.text);
//          console.log(items.token)
//          done();
//     });
//
// });
// });
  //   it('should return error trying to save duplicate username', function(done) {
  //   request(url)
	// .post('/register')
	// .send(body)
  //   // end handles the response
	// .end(function(err, res) {
  //         if (err) {
  //           throw err;
  //         }
  //         var items = JSON.parse(res.text);
  //         console.log(items.body.token)
  //         assert(items["success"] == false)
  //         done();
  //       });
  //   });
  //
  //   it('should return error accessing users without authorization', function(done) {
  //
  //   // once we have specified the info we want to send to the server via POST verb,
  //   // we need to actually perform the action on the resource, in this case we want to
  //   // POST on /api/profiles and we want to send some info
  //   // We do this using the request object, requiring supertest!
  //   request(url)
  //   .get('/api/users')
  //
  //   // end handles the response
  // .end(function(err, res) {
  //         if (err) {
  //           throw err;
  //         }
  //         res.status.should.be.equal(403);
  //
  //         // this is should.js syntax, very clear
  //         // res.should.have.property('status', 400);
  //         done();
  //       });
  //   });
  });
//   describe('Api', function() {
//     var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImZpcnN0TmFtZSI6ImRlZmF1bHQiLCJsYXN0TmFtZSI6ImRlZmF1bHQiLCJlbWFpbCI6ImluaXQiLCJwaG9uZSI6ImluaXQiLCJldmVudHMiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnsiZmlyc3ROYW1lIjp0cnVlLCJsYXN0TmFtZSI6dHJ1ZX0sImluaXQiOnsiX192Ijp0cnVlLCJlbWFpbCI6dHJ1ZSwicGhvbmUiOnRydWUsImV2ZW50cyI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6eyJzYXZlIjpbbnVsbCxudWxsXSwiaXNOZXciOltudWxsLG51bGxdfSwiX2V2ZW50c0NvdW50IjoyLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImVtYWlsIjoiIiwicGhvbmUiOiIiLCJldmVudHMiOlt7Il9pZCI6IjU2ZjJhNWY1OWEwMWE2NmIxMWMxMDJjNiIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhNjdlNGYwNzhiNzQxMWQ1Yjg0YyIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhNmQ3NTFjOGYyN2IxMTE4YmMyMCIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhNmUzNWVkNjgwN2QxMTA0NjZlNSIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhNzcwMmRhZjkxOGExMTliZDVkNiIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhNzdmNGIwYWVmOGQxMTg1OGQ5OCIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhODA1ODIwMmY2OWQxMTY1NzI0NiIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhOGEwYjE5N2JiYTYxMTI4YjEzZSIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhOGEzYjY2NWJlYTkxMTk0MDcyYyIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhOTFkZWE0MWExYjAxMTIzYWJkNSIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhOTI2YTM0YmYzYjExMTMwYTE3NiIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhOTJkYjYxMjE5YjUxMWQ3YmQ0OSIsImFkbWluIjp0cnVlfSx7Il9pZCI6IjU2ZjJhOTMyZjgzZTEzYjgxMTc1OWRkMCIsImFkbWluIjp0cnVlfSx7ImV2ZW50SWQiOiI1NmYyYTk1OGQ0YTQyOWJjMTFmYjFjZTQiLCJfaWQiOiI1NmYyYTk1OGQ0YTQyOWJjMTFmYjFjZTUiLCJhZG1pbiI6dHJ1ZX0seyJldmVudElkIjoiNTZmMmE5NjMyMzIyN2NjMDExYjU4OWNkIiwiX2lkIjoiNTZmMmE5NjMyMzIyN2NjMDExYjU4OWNlIiwiYWRtaW4iOnRydWV9LHsiZXZlbnRJZCI6IjU2ZjJhOWE0YjdjZmZhYzYxMTk0MTc2MSIsImV2ZW50VGl0bGUiOiJTYXJhaCBhbmQgSm9obiIsIl9pZCI6IjU2ZjJhOWE0YjdjZmZhYzYxMTk0MTc2MiIsImFkbWluIjp0cnVlfSx7ImV2ZW50SWQiOiI1NmYyYTliY2IxNTJlN2NiMTFkZGFhMGEiLCJldmVudFRpdGxlIjoiU2FyYWggYW5kIEpvaG4iLCJfaWQiOiI1NmYyYTliY2IxNTJlN2NiMTFkZGFhMGIiLCJhZG1pbiI6dHJ1ZX0seyJldmVudElkIjoiNTZmMmE5ZWNiMTUyZTdjYjExZGRhYTBkIiwiZXZlbnRUaXRsZSI6IlNhcmFoIGFuZCBKb2huIiwiX2lkIjoiNTZmMmE5ZWNiMTUyZTdjYjExZGRhYTBlIiwiYWRtaW4iOnRydWV9LHsiZXZlbnRJZCI6IjU2ZjJhOWY3MzUwN2ExZDQxMTVlNDVjOCIsImV2ZW50VGl0bGUiOiJTYXJhaCBhbmQgSm9obiIsIl9pZCI6IjU2ZjJhOWY3MzUwN2ExZDQxMTVlNDVjOSIsImFkbWluIjp0cnVlfSx7ImV2ZW50SWQiOiI1NmYyYWEzMjYxYWZlMWRkMTExMTQ3ZGYiLCJldmVudFRpdGxlIjoiU2FyYWggYW5kIEpvaG4iLCJfaWQiOiI1NmYyYWEzMjYxYWZlMWRkMTExMTQ3ZTAiLCJhZG1pbiI6dHJ1ZX0seyJldmVudElkIjoiNTZmMmFhMzI2MWFmZTFkZDExMTE0N2UxIiwiZXZlbnRUaXRsZSI6IlNhcmFoIGFuZCBKb2huIiwiX2lkIjoiNTZmMmFhMzI2MWFmZTFkZDExMTE0N2UyIiwiYWRtaW4iOnRydWV9LHsiZXZlbnRJZCI6IjU2ZjJhYTY4NjFhZmUxZGQxMTExNDdlNCIsImV2ZW50VGl0bGUiOiJTYXJhaCBhbmQgSm9obiIsIl9pZCI6IjU2ZjJhYTY4NjFhZmUxZGQxMTExNDdlNSIsImFkbWluIjp0cnVlfSx7ImV2ZW50SWQiOiI1NmYyYWE5ODZhMWZmNmVkMTE2ZTU3ZTQiLCJldmVudFRpdGxlIjoiU2FyYWggYW5kIEpvaG4iLCJfaWQiOiI1NmYyYWE5ODZhMWZmNmVkMTE2ZTU3ZTUiLCJhZG1pbiI6dHJ1ZX0seyJldmVudElkIjoiNTZmMmFhOTg2YTFmZjZlZDExNmU1N2U2IiwiZXZlbnRUaXRsZSI6IlNhcmFoIGFuZCBKb2huIiwiX2lkIjoiNTZmMmFhOTk2YTFmZjZlZDExNmU1N2U3IiwiYWRtaW4iOnRydWV9LHsiZXZlbnRJZCI6IjU2ZjJhYWM4ODg1OWI0ZjMxMTBjNTRkOCIsImV2ZW50VGl0bGUiOiJTYXJhaCBhbmQgSm9obiIsIl9pZCI6IjU2ZjJhYWM4ODg1OWI0ZjMxMTBjNTRkOSIsImFkbWluIjp0cnVlfSx7ImV2ZW50SWQiOiI1NmYyYWFkYjk0MTA5ZmZhMTFjOWU3YTciLCJldmVudFRpdGxlIjoiU2FyYWggYW5kIEpvaG4iLCJfaWQiOiI1NmYyYWFkYjk0MTA5ZmZhMTFjOWU3YTgiLCJhZG1pbiI6dHJ1ZX0seyJldmVudElkIjoiNTZmMmFhZGI5NDEwOWZmYTExYzllN2E5IiwiZXZlbnRUaXRsZSI6IlNhcmFoIGFuZCBKb2huIiwiX2lkIjoiNTZmMmFhZGI5NDEwOWZmYTExYzllN2FhIiwiYWRtaW4iOnRydWV9LHsiZXZlbnRJZCI6IjU2ZjJhYWU4YTZhNjlhZmUxMWY0ZmU0MyIsImV2ZW50VGl0bGUiOiJTYXJhaCBhbmQgSm9obiIsIl9pZCI6IjU2ZjJhYWU5YTZhNjlhZmUxMWY0ZmU0NCIsImFkbWluIjp0cnVlfSx7ImV2ZW50SWQiOiI1NmYyYWFmMzZmM2FhMDA1MTJjZGZmZjkiLCJldmVudFRpdGxlIjoiU2FyYWggYW5kIEpvaG4iLCJfaWQiOiI1NmYyYWFmMzZmM2FhMDA1MTJjZGZmZmEiLCJhZG1pbiI6dHJ1ZX0seyJldmVudElkIjoiNTZmMmFhZjM2ZjNhYTAwNTEyY2RmZmZiIiwiZXZlbnRUaXRsZSI6IlNhcmFoIGFuZCBKb2huIiwiX2lkIjoiNTZmMmFhZjM2ZjNhYTAwNTEyY2RmZmZjIiwiYWRtaW4iOnRydWV9LHsiZXZlbnRJZCI6IjU2ZjJhYjBlNmEwMDUyMDkxMjdkMWUyZCIsImV2ZW50VGl0bGUiOiJTYXJhaCBhbmQgSm9obiIsIl9pZCI6IjU2ZjJhYjBlNmEwMDUyMDkxMjdkMWUyZSIsImFkbWluIjp0cnVlfSx7ImV2ZW50SWQiOiI1NmYyYWIxYzBlNWZmNTBlMTI4ZDQ3ZjciLCJldmVudFRpdGxlIjoiU2FyYWggYW5kIEpvaG4iLCJfaWQiOiI1NmYyYWIxYzBlNWZmNTBlMTI4ZDQ3ZjgiLCJhZG1pbiI6dHJ1ZX0seyJldmVudElkIjoiNTZmMmFiM2M5ZGY4YzUxMjEyZjRkMmU5IiwiZXZlbnRUaXRsZSI6IlNhcmFoIGFuZCBKb2huIiwiX2lkIjoiNTZmMmFiM2M5ZGY4YzUxMjEyZjRkMmVhIiwiYWRtaW4iOnRydWV9LHsiZXZlbnRJZCI6IjU2ZjJhYjRlY2Q2NmVlMTYxMjg5NDdhZSIsImV2ZW50VGl0bGUiOiJTYXJhaCBhbmQgSm9obiIsIl9pZCI6IjU2ZjJhYjRlY2Q2NmVlMTYxMjg5NDdhZiIsImFkbWluIjp0cnVlfV0sIl9fdiI6MCwicGFzc3dvcmQiOiIkMmEkMTAkL3VwNW5RUXR0eDJkNWpEVnM1UUlFdUZRR3p1Z005R0Z2ckZCS0RFNVNhdVkzSU5tWTFYbTIiLCJ1c2VybmFtZSI6ImNoYXJsZXMiLCJfaWQiOiI1NmYyYTU5ZjZhYWVmYzYxMTEyZGM5YzkifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ1ODgyOTY2MSwiZXhwIjoxNDU4OTE2MDYxfQ.XTxkSMM6mSAhJPdHywncxckeOSd1PLBB1JQjqmnYUw8";
//     var events =
//       {
//         _id:"56f2ab4ecd66ee16128947ae",
//         eventTitle: 'Sarah and John',
//         city: 'Charleston',
//         state:'SC',
//         zip:'29401'
//
//       };
//
//     var user = {
//         _id:"56f2a59f6aaefc61112dc9c9",
//         username: 'charles',
//         password: 'me',
//         email:'charleslane23@gmail.com',
//         phone:'18436479951',
//         events:[],
//     };
//     var eventDate = {
//       _id:"56f3efd78261be0a1e611985",
//       title:'It is raining go inside',
//       date: 1458228403808,
//       textMsg:{
//         bool: true,
//         time: 1800000
//       },
//       email:{
//         bool: true,
//         time: 1800000
//       },
//     }
//
//     it('should allow access with token', function(done) {
//     request(url)
//     .get('/api/users')
//     .set('x-access-token',token)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           res.status.should.be.equal(200);
//
//           // this is should.js syntax, very clear
//           // res.should.have.property('status', 400);
//           done();
//         });
//     });
//     it('should allow charles to login', function(done) {
//
//       var profile = {
//         username: user.username,
//         password: user.password
//       };
//     request(url)
//     .post('/api/authenticate')
//     .send(profile)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           // res.status.should.be.equal(200);
//           var items = JSON.parse(res.text);
//           assert(items.username == "charles")
//           done();
//         });
//     });
//     it('should allow facebook login', function(done) {
//     request(url)
//     .get('/auth/facebook/callback')
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           res.status.should.be.equal(302);
//           // var items = JSON.parse(res.text);
//           // console.log(items,'items')
//           // assert(items.succcess == true)
//           done();
//         });
//     });
//     it('should allow charles to update information', function(done) {
//
//     request(url)
//     .put('/api/updateprofile/'+user._id)
//     .set('x-access-token',token)
//     .send(user)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           var items = JSON.parse(res.text);
//           // res.status.should.be.equal(200);
//           assert(items.user.username == 'charles')
//           // console.log(res.text)
//           // assert(res.text.email == 'charleslane23@gmail.com')
//
//
//           // this is should.js syntax, very clear
//           // res.should.have.property('status', 400);
//           done();
//         });
//     });
//
//
//     it('should be able to create event', function(done) {
//     request(url)
//     .post('/api/createevent/'+user._id)
//     .set('x-access-token',token)
//     .send(events)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           var items = JSON.parse(res.text);
//           res.status.should.be.equal(200);
//           // this is should.js syntax, very clear
//           // res.should.have.property('status', 400);
//           done();
//         });
//     });
//     it('should be able to get all events for user', function(done) {
//     request(url)
//     .get('/api/getevents/'+user._id)
//     .set('x-access-token',token)
//     .send(events)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           var items = JSON.parse(res.text);
//           console.log(items,'items')
//           assert(items.length == 1)
//           // this is should.js syntax, very clear
//           // res.should.have.property('status', 400);
//           done();
//         });
//     });
//
//     it('should allow charles to update event', function(done) {
//     request(url)
//     .put('/api/editevent/'+events._id)
//     .set('x-access-token',token)
//     .send(events)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           var items = JSON.parse(res.text);
//           assert(items.eventTitle == events.eventTitle)
//           // this is should.js syntax, very clear
//           res.status.should.be.equal(200);
//           done();
//         });
//     });
//     it('should show charles is invited to event', function(done) {
//     request(url)
//     .get('/api/events/'+user._id)
//     .set('x-access-token',token)
//
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           var items = JSON.parse(res.text);
//           res.status.should.be.equal(200);
//           assert(items.eventTitle == 'Sarah and John')
//           // this is should.js syntax, very clear
//           // res.should.have.property('status', 400);
//           done();
//         });
//     });
//     it('should be able to create eventDate', function(done) {
//     request(url)
//     .post('/api/createeventdate/'+"56f2ab0e6a005209127d1e2d")
//     .set('x-access-token',token)
//     .send(eventDate)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           var items = JSON.parse(res.text);
//           res.status.should.be.equal(200);
//           assert(items.title == 'It is raining go inside')
//           // this is should.js syntax, very clear
//           // res.should.have.property('status', 400);
//           done();
//         });
//     });
//     it('should be able to update eventDate', function(done) {
//     request(url)
//     .put('/api/updateeventdate/'+eventDate._id)
//     .set('x-access-token',token)
//     .send(eventDate)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           var items = JSON.parse(res.text);
//           res.status.should.be.equal(200);
//           assert(items.title == 'It is raining go inside')
//           // this is should.js syntax, very clear
//           // res.should.have.property('status', 400);
//           done();
//         });
//     });
//     it('should allow charles to delete eventDate from user', function(done) {
//     request(url)
//     .delete('/api/deleteeventdate/'eventDate._id+'/'+events._id)
//     .set('x-access-token',token)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           // var items = JSON.parse(res.text);
//           // assert(items.length == 1)
//           // this is should.js syntax, very clear
//           res.status.should.be.equal(200);
//           done();
//         });
//     });
//     it('should allow charles to delete event from user', function(done) {
//     request(url)
//     .put('/api/deleteevents/'+user._id+'/'+'56f163f4e5d844e527daf163')
//     .set('x-access-token',token)
//     //set token
//     // end handles the response
//     .end(function(err, res) {
//           if (err) {
//             throw err;
//           }
//           // var items = JSON.parse(res.text);
//           // assert(items.length == 1)
//           // this is should.js syntax, very clear
//           res.status.should.be.equal(200);
//           done();
//         });
//     });
// });
// });
