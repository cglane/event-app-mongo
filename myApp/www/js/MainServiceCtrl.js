(function(){
"use strict";

angular
  .module('starter')
  .controller('MainServiceCtrl', function($scope, MainService) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.hello = 'hello'
    $scope.chats = MainService.all();
    $scope.remove = function(chat) {
      MainService.remove(chat);
    };
    var user = {
      username:'charlesMe',
      password:'node'
    }
    $scope.register = function(){
      console.log('hello')
      MainService.registerUser().success(function(data){
        console.log('hello')
        console.log(data,'data')
      })
    }
    $scope.register(user);
  })
})();
