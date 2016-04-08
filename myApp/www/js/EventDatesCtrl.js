(function(){
"use strict";

angular
  .module('starter')
  .controller('EventDatesCtrl', function($scope,MainService,$window,$http) {
    $scope.eventDates = []
    $scope.todayEvents = [];
    $scope.getTime = function(object){
      return moment(object).fromNow()
    }
    console.log($scope.todayEvents,'todayEvents')
    MainService.getEventDates().success(function(eventDates){
      eventDates.forEach(function(el){
        if(el.start && el.end){
          if(moment().diff(el.start,'days') === 0){
            $scope.todayEvents.push(el)
          }else{
            $scope.eventDates.push(el);
          }
        }
      })
    })
  })
})();
