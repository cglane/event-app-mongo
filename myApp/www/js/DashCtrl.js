(function(){
"use strict";

angular
  .module('starter')
  .controller('DashCtrl', function($scope,MainService,$window,$http) {
      MainService.getUserInfo().success(function(user){
        console.log(user,'user')
        $scope.user = user;
      })
      MainService.getEvents().success(function(userEvents){
        console.log(userEvents,'userEvents')
        $scope.userEvents = userEvents;
      })
      $scope.setEventId = function(id){
        localStorage.setItem('eventId',id);
      }
  })
})();
