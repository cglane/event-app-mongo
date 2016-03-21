(function(){
"use strict";

angular
  .module('main')
  .controller('MainController',function($interval,MainService,$scope,$state,$timeout){
    $scope.formData = {};
    $scope.userData = {};
    $scope.loginData = {};
    $scope.updateData = {};
    $scope.loading = true;
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