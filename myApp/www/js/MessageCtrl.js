(function(){
"use strict";

angular
  .module('starter')
  .controller('MessageCtrl', function($ionicPopup,$location,$scope, $state,$stateParams, MainService,$ionicSideMenuDelegate) {
    var phoneNumbers = [];
    var emailAddresses = [];
    $scope.activeUsers = [];
    //get users and all phone numbers/emailAddresses
    // MainService.getEventUsers().success(function(users){
    //   console.log(users,'users')
    //   users.forEach(function(el){
    //       if(el.phone){
    //         phoneNumbers.push(el.phone);
    //       }
    //       if(el.email){
    //         emailAddresses.push(el.email)
    //       }
    //     })
    //     if(el.email && el.phone){
    //         $scope.activeUsers.push(el)
    //       }
    //   })

      $scope.groupEmail = function(){
        $scope.emailData = {}
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          templateUrl: 'templates/groupEmailPop.html',
          title: 'Group Email',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Send</b>',
              type: 'button-positive',
              onTap: function(e) {
                MainService.sendEmail($scope.emailData).success(function(el){
                  console.log(el)
                })
              }
            }
          ]
        });
       };
       $scope.groupText = function(){
         $scope.textData = {}
         // An elaborate, custom popup
         var myPopup = $ionicPopup.show({
           templateUrl: 'templates/groupTextPop.html',
           title: 'Group Text',
           scope: $scope,
           buttons: [
             { text: 'Cancel' },
             {
               text: '<b>Send</b>',
               type: 'button-positive',
               onTap: function(e) {
                 MainService.sendText($scope.textData).success(function(el){
                   console.log(el)
                 })
               }
             }
           ]
         });
        };
  });
})();
