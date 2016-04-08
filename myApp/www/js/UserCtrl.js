(function(){
"use strict";

angular
  .module('starter')
  .controller('UserCtrl', function($ionicPopup,$scope,MainService,$window,$http) {

      var getUsers = function(){
        MainService.getEventUsers().success(function(users){
          $scope.eventUsers = users;
        })
      }
      getUsers()

      $scope.editUser = function(index){
        var clickedUser = $scope.eventUsers[index]
        $scope.data = {
          first:clickedUser.first,
          last:clickedUser.last,
          phone:clickedUser.phone,
          email:clickedUser.email
        };
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          templateUrl: 'templates/editUserPop.html',
          title: 'Edit User',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if($scope.data.first){
                  var userObject = {
                    email: $scope.data.email,
                    phone:$scope.data.phone,
                    firstName:$scope.data.first,
                    lastName:$scope.data.last,
                  }
                  MainService.updateUser(userObject,clickedUser._id).success(function(el){
                    console.log(el,'response')
                    getUsers()
                  })
                }else{
                  e.preventDefault();
                  alert('Almost There')
                }
              }
            }
          ]
        });
       };
       $scope.inviteUser = function(){
         $scope.inviteData = {}
         var d = $scope.inviteData;
         // An elaborate, custom popup
         var myPopup = $ionicPopup.show({
           templateUrl: 'templates/inviteUserPop.html',
           title: 'Edit User',
           scope: $scope,
           buttons: [
             { text: 'Cancel' },
             {
               text: '<b>Save</b>',
               type: 'button-positive',
               onTap: function(e) {
                 if(d.email && d.phone && d.text){
                   var inviteeObject = {
                     username: d.email,
                     phone:d.phone,
                     email:d.email,
                     lastName:d.last,
                     firstName:d.first
                   }
                   console.log(inviteeObject,'inviteeObject')
                   console.log(d.text,'d.text')
                   console.log(d.text === 'true','is true')
                   MainService.inviteToEvent(inviteeObject,d.admin).success(function(el){
                     if(d.text === 'true'){
                       if(el.success !== false){
                         console.log('send text')
                         MainService.sendTextInvite(inviteeObject);
                       }
                     }
                     console.log(el,'el')
                   })
                    //  getUsers()
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
