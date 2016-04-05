angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope,MainService,$window,$http) {
//     MainService.getUserInfo().success(function(user){
//       console.log(user,'user')
//       $scope.user = user;
//     })
//     MainService.getEvents().success(function(userEvents){
//       console.log(userEvents,'userEvents')
//       $scope.userEvents = userEvents;
//     })
//     $scope.setEventId = function(id){
//       localStorage.setItem('eventId',id);
//     }
// })
// .controller('RegisterCtrl', function($scope,MainService,$window,$http,$location,$state) {
//
//     if(localStorage.getItem('token')){
//       console.log(localStorage.getItem('token'))
//     }
//     $scope.logData = {};
//     $scope.regData = {};
//     $scope.loading = true;
//
//     $scope.load = function() {
//     $http.get('/facebook/me').success(function(userData) {
//       console.log(userData,'userData')
//       $scope.userData = userData;
//       console.log(userData.token)
//       localStorage.setItem('token',userData.token);
//       localStorage.setItem('currId',userData.global._id)
//       $state.go('tab.dash')
//     });
//   };
//     //register user
//     $scope.facebookLogin = function(){
//     var url = 'http://localhost:3000/auth/facebook';
//     if ($window.cordova) {
//       url += '?redirect=' +
//         encodeURIComponent('http://i.imgur.com/XseoGPD.png');
//     } else {
//       url += '?redirect=' + encodeURIComponent(window.location.href);
//     }
//
//     var ref = window.open(url, '_blank', 'location=no');
//
//     // For Cordova
//     ref.addEventListener('loadstop', function(ev) {
//       if (ev.url.indexOf('/auth/facebook') === -1) {
//         ref.close();
//         $scope.load();
//       }
//     });
//
//     // For Ionic serve workflow
//     ref.onload = function(ev) {
//       ref.close();
//       $scope.load();
//     };
//   };
//     $scope.regularLogin = function(){
//       MainService.authenticateUser($scope.logData).success(function(user){
//         if(!user.success){
//           $scope.loginFail = true;
//           console.log('login failure')
//         }
//         if(user.token){
//           localStorage.setItem('token',user.token);
//           localStorage.setItem('currId',user._id);
//           $state.go('tab.dash');
//           console.log(user,'user');
//         }
//       })
//     };
//     $scope.registerUser = function(){
//       MainService.registerUser($scope.regData).success(function(user){
//         if(!user.success){
//           $scope.registerFail = true;
//           console.log('register failure')
//         }
//         if(user.body){
//           console.log('user',user);
//           localStorage.setItem('token',user.token);
//           localStorage.setItem('currId',user.body._id);
//           $state.go('tab.dash')
//
//         }
//       })
//     }
// })

// .controller('MainServiceCtrl', function($scope, MainService) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});
//   $scope.hello = 'hello'
//   $scope.chats = MainService.all();
//   $scope.remove = function(chat) {
//     MainService.remove(chat);
//   };
//   var user = {
//     username:'charlesMe',
//     password:'node'
//   }
//   $scope.register = function(){
//     console.log('hello')
//     MainService.registerUser().success(function(data){
//       console.log('hello')
//       console.log(data,'data')
//     })
//   }
//   $scope.register(user);
// })
// .controller('EventsCtrl', function($scope, $stateParams, MainService,$ionicSideMenuDelegate) {
//   var eventId = localStorage.getItem('eventId');
//   $scope.toggleLeft = function() {
//     $ionicSideMenuDelegate.toggleLeft();
//   };
//   MainService.getEvents().success(function(eventsObject){
//     $scope.currentEvent = {};
//     eventsObject.forEach(function(el){
//       if(el._id === $scope.eventId){
//         console.log(el,'el')
//         $scope.currentEvent = el;
//       }
//     })
//   })
//   $scope.list = [
//     {title:'dash',checked:true,icon:'home'},
//     {title:'calendar',checked:false,icon:'calendar'},
//     {title:'messages',checked:false,icon:'chatboxes'},
//     {title:'users',checked:false,icon:'person'},
//     {title:'acccount',checked:false,icon:'gear'}
//   ]
//   $scope.clearChecked = function(){
//     console.log('hello');
//     $scope.list.forEach(function(el){
//       console.log(el.checked)
//       el.checked = false;
//     })
//   }
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, MainService) {
//   $scope.chat = MainService.get($stateParams.chatId);
// })
// .controller('CalendarCtrl', function($scope, $stateParams, MainService) {
// })
// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
});
