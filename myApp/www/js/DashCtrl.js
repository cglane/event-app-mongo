(function(){
"use strict";

angular
  .module('starter')
  .controller('DashCtrl', function($timeout,$ionicLoading,$ionicHistory,$templateCache,$scope,$location,MainService,$window,$http,$ionicPopup) {

      $scope.logOutUser = function(){
        // $templateCache.removeAll()
        localStorage.setItem('currId','')
        localStorage.setItem('eventId','')
        localStorage.setItem("token",'')
        $ionicLoading.show({template:'Logging out....'});
    $timeout(function () {
        $ionicHistory.clearCache().then(function(){
          $ionicLoading.hide();
          console.log('cache cleared');
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
          $location.path('/register');
        });
      }, 1000);
      }
      MainService.getUserInfo().success(function(user){
        console.log(user,'user')
        $scope.user = user;
      })
      $scope.messages = [];
      MainService.getEvents().success(function(userEvents){
        console.log(userEvents,'userEvents')
        $scope.userEvents = userEvents;
        userEvents.forEach(function(el){
          if(el.messages.length > 0){
            console.log(el.messages,'mess')
            //concat arrays
            $scope.messages = $scope.messages.concat(el.messages);

          }
        })
        console.log($scope.messages,'messages')
      })
      $scope.getTime = function(time){
        return moment(time).fromNow()
      }
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
