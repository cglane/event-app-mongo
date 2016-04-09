(function(){
"use strict";

angular
  .module('main')
  .controller('MainController',function($interval,MainService,$scope,$state,$timeout){
    var clientId = '11087199701161-5p2msmfiojl0bovne4fn0mi879lb3fbj.apps.googleusercontent.com';
         var apiKey = 'AIzaSyCze72Ua9-MWfqD_6wWLt29H0Cri1tKpos';
         var scopes = 'https://www.googleapis.com/auth/contacts.readonly';
         $scope.getGoogleContacts = function(){
           gapi.client.setApiKey(apiKey);
           window.setTimeout(authorize);
         };
         function authorize() {
           gapi.auth.authorize({client_id: '110291095446-af18dht1lp2gmuk41ss88d4q36hpf87h.apps.googleusercontent.com', scope: scopes, immediate: false}, handleAuthorization);
         }
         function handleAuthorization(authorizationResult) {
           if (authorizationResult && !authorizationResult.error) {
             $.get("https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=500&v=3.0",
               function(response){
                 //process the response here
                 console.log(response);
               });
           }
         }
    //check if user is logged in, if logged in go to user page
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

    $scope.testFun = function(){
      $scope.two = $scope.one + 2;
    }
//Register User----------s-------------s
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
$scope.getUsers = function(){
  MainService.getUsers().success(function(data){
    console.log(data,'data')
  })
};
$scope.getEvents = function(){
  MainService.getEvents().success(function(data){
    console.log(data,'events')
  })
}
$scope.getEvents();
$scope.newEvent={};
$scope.createEvent = function(){
  console.log($scope.eventTitle,'eventTitles')
  $scope.newEvent.eventTitle = $scope.eventTitle;
  $scope.newEvent.city = $scope.city;
  $scope.newEvent.state = $scope.state;
  $scope.newEvent.zip = $scope.zip;
  MainService.createEvent($scope.newEvent)
    .success(function(data){
      console.log(data,'createEvent')
    })
}

$scope.getUsers();
$scope.updateUser = function(){
  $scope.updateData.username = $scope.usernameUpdate;
  $scope.updateData.password = $scope.passwordUpdate;
  MainService.updateUser($scope.updateData)
    .success(function(data){
      console.log(data,'data')
    })
};
});
})();
