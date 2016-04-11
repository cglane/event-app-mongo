(function(){
"use strict";

angular
  .module('starter')
  .controller('DashCtrl', function($scope,$location,MainService,$window,$http,$ionicPopup) {
      MainService.getUserInfo().success(function(user){
        console.log(user,'user')
        $scope.user = user;
      })
      MainService.getEvents().success(function(userEvents){
        console.log(userEvents,'userEvents')
        $scope.userEvents = userEvents;
      })
      $scope.setEventId = function(id,title){
        console.log(id,title)
        localStorage.setItem('eventId',id);
        localStorage.setItem('eventTitle',title)
      }
      $scope.createEvent = function() {
        $scope.data = {};
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          templateUrl: 'templates/createEventPop.html',
          title: 'Create New Event',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if($scope.data.eventTitle){
                  var dataObject = {
                    eventTitle:$scope.data.eventTitle,
                    city:$scope.data.city,
                    state:$scope.data.state,
                    zip:$scope.data.zip
                  };
                  MainService.createEvent(dataObject).success(function(el){
                    localStorage.setItem('eventId',el._id);
                    localStorage.setItem('eventTitle',el.eventTitle)
                    console.log(el,'el')
                    if(el.success != false){
                    $location.path('#/events/dash')
                  }
                  })
                  //create Event
                }else{
                  e.preventDefault();
                  alert('Almost There')
                }
              }
            }
          ]
        });
       };
  })
})();
