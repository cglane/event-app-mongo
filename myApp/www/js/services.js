(function(){
  "use strict"
  angular
    .module('starter.services',[])
    .factory('MainService',function($http){
    var token;
    if(localStorage.getItem('token')){
      token = localStorage.getItem("token")
    }
    var registerUser = function(user){
      return $http.post('/register',user)
    }
    var authenticateUser = function(user){
      return $http.post("/api/authenticate",user)
    }
    var facebookAuth  = function(){
      return $http.get("/auth/facebook");
    }
    var getUserInfo = function(user){
      return $http({
            url: '/api/getUserInfo/'+localStorage.getItem('currId'),
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var updateUser = function(user,userId){
      return $http({
            url: '/api/updateuser/'+userId,
            dataType: 'json',
            method: 'PUT',
            data: user,
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var getEventUsers = function(){
      return $http({
            url: '/api/geteventusers/'+localStorage.getItem('eventId'),
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var getEventInfo = function(){
      return $http({
            url: '/api/geteventinfo/'+localStorage.getItem('eventId'),
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var addUserToEvent = function(userId,bool){
      return $http({
            url: '/api/addtoevent/'+userId+'/'+localStorage.getItem('eventId')+'/'+bool,
            dataType: 'json',
            method: 'PUT',
            data: '',
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var inviteToEvent = function(invitee,bool){
      return $http({
            url: '/api/invitetoevent/'+localStorage.getItem('eventId')+'/'+bool+'/'+localStorage.getItem('eventTitle'),
            dataType: 'json',
            method: 'PUT',
            data: invitee,
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }

    var createEvent = function(object){
      return $http({
            url: '/api/createevent/'+localStorage.getItem('currId'),
            dataType: 'json',
            method: 'POST',
            data: object,
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var getEvents = function(){
      return $http({
            url: '/api/getevents/'+localStorage.getItem('currId'),
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var getEventDates = function(){
      return $http({
            url: '/api/geteventdate/'+localStorage.getItem('eventId'),
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var createEventDate = function(object){
      return $http({
            url: '/api/createeventdate/'+localStorage.getItem('eventId'),
            dataType: 'json',
            method: 'POST',
            data: object,
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var editEventDate = function(object,id){
      return $http({
            url: '/api/updateeventdate/'+id+'/'+localStorage.getItem('eventId'),
            dataType: 'json',
            method: 'PUT',
            data: object,
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
    }
    var getUsers = function(){
      return $http({
            url: '/api/users',
            dataType: 'json',
            method: 'GET',
            data: '',
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token

            }
          });
          }

    var updateProfile = function(user,currId){
      return $http({
            url: '/api/updateprofile/'+localStorage.getItem("currId"),
            dataType: 'json',
            method: 'PUT',
            data: user,
            headers: {
              "Content-Type": "application/json",
              "x-access-token":token
            }
          });
          }
      var sendTextInvite = function(data){
        return $http({
              url: '/api/sendtextinvite',
              dataType: 'json',
              method: 'POST',
              data: data,
              headers: {
                "Content-Type": "application/json",
                "x-access-token":token
              }
            });
      }
      var sendEmailInvite = function(data){
        return $http({
              url: '/api/sendemailinvite',
              dataType: 'json',
              method: 'POST',
              data: data,
              headers: {
                "Content-Type": "application/json",
                "x-access-token":token
              }
            });
      }
      var sendEmail = function(body){
        return $http({
              url: '/api/sendemail/'+localStorage.getItem('eventId'),
              dataType: 'json',
              method: 'POST',
              data: body,
              headers: {
                "Content-Type": "application/json",
                "x-access-token":token
              }
            });
      }
      var sendText = function(body){
        return $http({
              url: '/api/sendtext/'+localStorage.getItem('eventId'),
              dataType: 'json',
              method: 'POST',
              data: body,
              headers: {
                "Content-Type": "application/json",
                "x-access-token":token
              }
            });
      }
      var removeUser = function(userId,admin){
        return $http({
              url: '/api/deleteeventsuser/'+userId+'/'+localStorage.getItem('eventId'),
              dataType: 'json',
              method: 'PUT',
              data: '',
              headers: {
                "Content-Type": "application/json",
                "x-access-token":token
              }
            });
      }

      var uploadPhoto = function(file){
        return $http({
              url: '/api/uploadphoto/',
              method: 'POST',
              data: file,
              headers: {
                "Content-Type": undefined,
                "x-access-token":token
              }
            });
      }

    return{
      uploadPhoto:uploadPhoto,
      getEventInfo:getEventInfo,
      removeUser:removeUser,
      sendText:sendText,
      sendEmail:sendEmail,
      sendEmailInvite:sendEmailInvite,
      sendTextInvite:sendTextInvite,
      updateUser:updateUser,
      inviteToEvent:inviteToEvent,
      getEventUsers:getEventUsers,
      editEventDate:editEventDate,
      createEventDate:createEventDate,
      getEventDates:getEventDates,
      facebookAuth:facebookAuth,
      getEvents:getEvents,
      getUserInfo:getUserInfo,
      createEvent:createEvent,
      registerUser:registerUser,
      authenticateUser:authenticateUser,
      getUsers:getUsers,
      updateProfile:updateProfile
    };
  });

})();
