angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,MainService,$window,$http) {
  if(localStorage.getItem('token')&&localStorage.getItem('currId')){
    MainService.getUserInfo()
      .success(function(data){
        console.log(data,'data')
      })
  }

  $scope.formData = {};
  $scope.userData = {};
  $scope.loginData = {};
  $scope.updateData = {};
  $scope.loading = true;
  var user = {
    username:'charles',
    password:'message'
  }
  // MainService.registerUser(user).success(function(data){
  //   console.log(data,'data')
  // })
  // $http.get('/api/v1/me').success(function(data){
  //   console.log('hello')
  // })
  $scope.say = function(){
    $scope.hello = 'charles';
  }
  $scope.load = function() {
  $http.get('/api/v1/me').success(function(data) {
    console.log(data,'data')
    $scope.data = data;
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
  $scope.registerUser = function(){
    $scope.userData.username = $scope.username;
    $scope.userData.password = $scope.password;
    MainService.registerUser($scope.userData)
    .success(function(data){
      console.log('token',data.token)
      localStorage.setItem('token', data.token);
      localStorage.setItem("currId",data._id)
      console.log(data,'data')
      return true;
    })
  }
  //Authenticate User
  $scope.authenticateUser = function(){
      $scope.loginData.username = $scope.loginName;
      $scope.loginData.password = $scope.loginPassword;
      console.log('hit authenticate User', $scope.loginData)
      MainService.authenticateUser($scope.loginData)
        .success(function(data){
          localStorage.setItem('token', data.token);
          localStorage.setItem("currId",data._id)
          console.log(data,'data')
        })
      };

})

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

.controller('ChatDetailCtrl', function($scope, $stateParams, MainService) {
  $scope.chat = MainService.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
