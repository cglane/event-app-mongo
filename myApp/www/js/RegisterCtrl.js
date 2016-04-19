(function(){
"use strict";

angular
  .module('starter')
  .controller('RegisterCtrl', function($scope,MainService,$window,$http,$location,$state) {

      if(localStorage.getItem('token')){
        console.log(localStorage.getItem('token'))
      }
      $scope.logData = {};
      $scope.regData = {};
      $scope.loading = true;

      $scope.load = function() {
      $http.get('/facebook/me').success(function(userData) {
        console.log(userData,'userData')
        $scope.userData = userData;
        console.log(userData.token)
        localStorage.setItem('token',userData.token);
        localStorage.setItem('currId',userData.global._id)
        $state.go('tab.dash')
      });
    };
      //register user
      $scope.facebookLogin = function(){
      var url = 'http://localhost:3000/auth/facebook';
      if ($window.cordova) {
        url += '?redirect=' +
          encodeURIComponent('http://i.imgur.com/XseoGPD.png');
      } else {
        url += '?redirect=' + encodeURIComponent(window.location.href);
      }

      var ref = window.open(url, '_blank', 'location=no');

      // For Cordova
      ref.addEventListener('loadstop', function(ev) {
        if (ev.url.indexOf('/auth/facebook') === -1) {
          ref.close();
          $scope.load();
        }
      });

      // For Ionic serve workflow
      ref.onload = function(ev) {
        ref.close();
        $scope.load();
      };
    };
      $scope.regularLogin = function(){
        MainService.authenticateUser($scope.logData).success(function(user){
          if(!user.success){
            $scope.loginFail = true;
            console.log('login failure')
          }
          if(user.token){
            localStorage.setItem('token',user.token);
            localStorage.setItem('currId',user._id);
            $location.path('/tab/dash');
            console.log(user,'user');
          }
        })
      };
      $scope.registerUser = function(){
        MainService.registerUser($scope.regData).success(function(user){
          if(!user.success){
            $scope.registerFail = true;
            console.log('register failure')
          }
          if(user.body){
            console.log('user',user);
            localStorage.setItem('token',user.token);
            localStorage.setItem('currId',user.body._id);
            $state.go('tab.dash')

          }
        })
      }
  })
})();
