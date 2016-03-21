(function(){
  "use strict"
  angular
    .module('main')
    .factory('MainService',function($http){
      var token;
      var currId;
      if(localStorage.getItem('token')){
         token = localStorage.getItem('token');
         currId = localStorage.getItem("currId");
         console.log(token,'token');
         console.log(currId,'currId')
      }
    var registerUser = function(user){
      return $http.post('/register',user)
    }
    var authenticateUser = function(user){
      return $http.post("/api/authenticate",user)
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
      registerUser:registerUser,
      authenticateUser:authenticateUser,
      getUsers:getUsers,
      updateUser:updateUser
    };
  });
})();