(function(){
"use strict";

angular
  .module('starter')
  .controller('UserCtrl', function($ionicPopup,$scope,MainService,$window,$http) {
    /////////////////////GOOGLE API////////////////////////////
      var googleContactsInfo = function(){
          var clientID = '11087199701161-5p2msmfiojl0bovne4fn0mi879lb3fbj.apps.googleusercontent.com';
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
                   var editResponse = [];

                  response.feed.entry.forEach(function(el){
                    if(el.gd$name && el.gd$email){
                      var object = {
                        name : el.gd$name.gd$fullName.$t,
                        email: el.gd$email[0].address
                      }
                    }
                  })
                  return editResponse
                 });
             }
           }
         }
         /////////////////////////////////////////////////

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
        $scope.googleContacts = function(){

          $scope.googleContactInfo = googleContactsInfo();
          $scope.googleInviteData = {}
          var d = $scope.googleInviteData;
          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            templateUrl: 'templates/googleContacts.html',
            title: 'Invite Google Contacts',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                  console.log($scope.googleInviteData)

                }
              }
            ]
          });
         };


  })
})();
