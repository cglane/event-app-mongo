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

    var updateUser = function(user,currId){
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



    return{
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
      updateUser:updateUser
    };
  });

})();
