(function(){
"use strict";

angular
  .module('starter')
  .controller('EventsCtrl', function($location,$scope, $state,$stateParams, MainService,$ionicSideMenuDelegate) {
    var eventId = localStorage.getItem('eventId');
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };
    MainService.getEvents().success(function(eventsObject){
      $scope.currentEvent = {};
      eventsObject.forEach(function(el){
        if(el._id === $scope.eventId){
          console.log(el,'el')
          $scope.currentEvent = el;
        }
      })
    })
    $scope.list = [
      {title:'dash',checked:true,icon:'home'},
      {title:'calendar',checked:false,icon:'calendar'},
      {title:'messages',checked:false,icon:'chatboxes'},
      {title:'users',checked:false,icon:'person'},
      {title:'acccount',checked:false,icon:'gear'},
      {title:'eventDates',checked:false,icon:'list'},

    ]
    $scope.clearChecked = function(){
      $location.path('events/tab');
      $scope.list.forEach(function(el){
        el.checked = false;
      })
    }
    $scope.enterState = function(stateID) {
            console.log(stateID);
            $state.go('events.'+stateID)
    };
  })
})();
