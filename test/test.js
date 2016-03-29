var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../config');
  // I want to create a connection with the database, and when I'm done, I call done().
  var user,token,userId,localEvent,eventId,bool,eventDateId,emailBody,textBody;
  var url = 'http://localhost:8080'
      before(function(done){
        mongoose.connect(config.database);
        user = {username:'hugh',password:'lane',password:'hugh',email:'charleslane23@gmail.com',phone:'+18436479951'};
        bool = true
        localEvent = {eventTitle:'Second Eve123456',city:'charleston',state:'sc',zip:'29401'}
        localEventDate = {title:'it is raining',startDate:Date.now(),textMsg:{bool:true,time:1000},email:{bool:true,time:1000}};
        emailBody = {emailBody:'this is an email',emailSubject:'this is an email subject'};
        textBody = {textBody:'this is a textBody'}
          done();
      })
      describe('Authorization', function(){

        it('should be able to register', function(done) {
          request(url)
      	.post('/register')
      	.send(user)
          // end handles the response
      	.end(function(err, res) {
                if (err) {
                  throw err;
                }
              res.status.should.be.equal(200);
                done();
              });
          });
          it('should return error trying to save duplicate username', function(done) {
            request(url)
          .post('/register')
          .send(user)
            // end handles the response
          .end(function(err, res) {
                  if (err) {
                    throw err;
                  }
                  var items = JSON.parse(res.text);
                  assert(items["success"] == false)
                  done();
                });
            });
          it('should allow me to login', function(done) {
              request(url)
              .post('/api/authenticate')
              .send(user)
              //set token
              // end handles the response
              .end(function(err, res) {
                    if (err) {
                      throw err;
                    }
                    // res.status.should.be.equal(200);
                    var items = JSON.parse(res.text);
                    token = items.token;
                    userId = items._id;
                    assert(items.username == user.username)
                    done();
                  });
              });
              it('should allow facebook login', function(done) {
                  request(url)
                  .get('/auth/facebook/callback')
                  //set token
                  // end handles the response
                  .end(function(err, res) {
                        if (err) {
                          throw err;
                        }
                        res.status.should.be.equal(302);
                        // assert(items.succcess == true)
                        done();
                      });
                  });
    })

    describe('Api Tests', function(){
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
                done();
              });
          });
              it('should allow user to update profile information', function(done) {

              request(url)
              .put('/api/updateprofile/'+userId)
              .set('x-access-token',token)
              .send(user)
              //set token
              // end handles the response
              .end(function(err, res) {
                    if (err) {
                      throw err;
                    }
                    res.status.should.be.equal(200);
                    done();
                  });
              });
              it('should allow user to create event', function(done) {
                  request(url)
                  .post('/api/createevent/'+userId)
                  .set('x-access-token',token)
                  .send(localEvent)
                  //set token
                  // end handles the response
                  .end(function(err, res) {
                        if (err) {
                          throw err;
                        }
                        var items = JSON.parse(res.text);
                        eventId = items._id;
                        res.status.should.be.equal(200);
                        // this is should.js syntax, very clear
                        // res.should.have.property('status', 400);
                        done();
                      });
                  });
                  it('should be able to get all events for user', function(done) {
                      request(url)
                      .get('/api/getevents/'+userId)
                      .set('x-access-token',token)
                      //set token
                      // end handles the response
                      .end(function(err, res) {
                            if (err) {
                              throw err;
                            }
                            var items = JSON.parse(res.text);
                          eventId = items[0]._id;
                            res.status.should.be.equal(200);
                            // this is should.js syntax, very clear
                            // res.should.have.property('status', 400);
                            done();
                          });
                      });

              // it('should allow for adding user to event,event to user', function(done) {
              //     request(url)
              //     .put('/api/addtoevent/'+userId+'/'+eventId+'/'+bool)
              //     .set('x-access-token',token)
              //     //set token
              //     // end handles the response
              //     .end(function(err, res) {
              //           if (err) {
              //             throw err;
              //           }
              //           var items = JSON.parse(res.text);
              //           console.log(items,'items')
              //           res.status.should.be.equal(200);
              //           // this is should.js syntax, very clear
              //           // res.should.have.property('status', 400);
              //           done();
              //         });
              //     });
              it('should be able to edit event', function(done) {
                  request(url)
                  .put('/api/editevent/'+ eventId)
                  .set('x-access-token',token)
                  .send(localEvent)
                  //set token
                  // end handles the response
                  .end(function(err, res) {
                        if (err) {
                          throw err;
                        }
                        var items = JSON.parse(res.text);
                        assert(items.eventTitle == localEvent.eventTitle)
                        // res.status.should.be.equal(200);
                        // this is should.js syntax, very clear
                        // res.should.have.property('status', 400);
                        done();
                      });
                  });
                  it('should be able to create event date', function(done) {
                      request(url)
                      .post('/api/createeventdate/'+eventId)
                      .set('x-access-token',token)
                      .send(localEventDate)
                      //set token
                      // end handles the response
                      .end(function(err, res) {
                            if (err) {
                              throw err;
                            }
                            var items = JSON.parse(res.text);
                            assert(items.title == localEventDate.title)
                            res.status.should.be.equal(200);
                            // this is should.js syntax, very clear
                            // res.should.have.property('status', 400);
                            done();
                          });
                      });
                      it('should be able to get all eventDates for event', function(done) {
                          request(url)
                          .get('/api/geteventdate/'+eventId)
                          .set('x-access-token',token)
                          //set token
                          // end handles the response
                          .end(function(err, res) {
                                if (err) {
                                  throw err;
                                }
                                var items = JSON.parse(res.text)
                                eventDateId = items[10]._id;
                                res.status.should.be.equal(200);
                                // this is should.js syntax, very clear
                                // res.should.have.property('status', 400);
                                done();
                              });
                          });
                          it('should be able to update event date', function(done) {
                              request(url)
                              .put('/api/updateeventdate/'+eventDateId+'/'+eventId)
                              .set('x-access-token',token)
                              .send(localEventDate)
                              //set token
                              // end handles the response
                              .end(function(err, res) {
                                    if (err) {
                                      throw err;
                                    }
                                    var items = JSON.parse(res.text)
                                    assert(items.title == localEventDate.title)
                                    // res.status.should.be.equal(200);
                                    // this is should.js syntax, very clear
                                    // res.should.have.property('status', 400);
                                    done();
                                  });
                              });
                              it('should be able to delete event Date', function(done) {
                                  request(url)
                                  .delete('/api/deleteeventdate/'+eventDateId+'/'+eventId)
                                  .set('x-access-token',token)
                                  //set token
                                  // end handles the response
                                  .end(function(err, res) {
                                        if (err) {
                                          throw err;
                                        }
                                        var items = JSON.parse(res.text)
                                          res.status.should.be.equal(200);
                                        // this is should.js syntax, very clear
                                        // res.should.have.property('status', 400);
                                        done();
                                      });
                                  });
                                  // it('should be able send email', function(done) {
                                  //     request(url)
                                  //     .post('/api/sendemail/'+eventId)
                                  //     .set('x-access-token',token)
                                  //     .send(emailBody)
                                  //     //set token
                                  //     // end handles the response
                                  //     .end(function(err, res) {
                                  //           if (err) {
                                  //             throw err;
                                  //           }
                                  //           var items = JSON.parse(res.text)
                                  //             res.status.should.be.equal(200);
                                  //           // this is should.js syntax, very clear
                                  //           // res.should.have.property('status', 400);
                                  //           done();
                                  //         });
                                  //     });
                                  //     it('should be able send textMessage', function(done) {
                                  //         request(url)
                                  //         .post('/api/sendtext/'+eventId)
                                  //         .set('x-access-token',token)
                                  //         .send(textBody)
                                  //         //set token
                                  //         // end handles the response
                                  //         .end(function(err, res) {
                                  //               if (err) {
                                  //                 throw err;
                                  //               }
                                  //                 res.status.should.be.equal(200);
                                  //               // this is should.js syntax, very clear
                                  //               // res.should.have.property('status', 400);
                                  //               done();
                                  //             });
                                  //         });
  })
