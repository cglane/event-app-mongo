(function(){
"use strict";

angular
  .module('starter')
  .controller('UserCtrl', function($ionicPopup,$scope,MainService,$window,$http) {
    /////////////////////GOOGLE API////////////////////////////
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
                   var responseArray = [];

                  response.feed.entry.forEach(function(el){
                    if(el.gd$name && el.gd$email){
                      var object = {
                        name : el.gd$name.gd$fullName.$t,
                        email: el.gd$email[0].address,
                        admin: 'false',
                      }
                    }
                    if(object != undefined){
                      responseArray.push(object)
                    }
                  })
                  $scope.googleContactPop(responseArray)
                 });
             }
           }

         /////////////////////////////////////////////////

      var getUsers = function(){
        MainService.getEventUsers().success(function(users){
          console.log(users,'users')
          $scope.eventUsers = users;
        })
      }
      getUsers()

      $scope.editUser = function(index){
        var clickedUser = $scope.eventUsers[index];
        console.log(clickedUser,'clickedUser')
        $scope.data = {
          firstName:clickedUser.firstName,
          lastName:clickedUser.lastName,
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
                if($scope.data.firstName){
                  var userObject = {
                    email: $scope.data.email,
                    phone:$scope.data.phone,
                    firstName:$scope.data.firstName,
                    lastName:$scope.data.lastName,
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
            },
            {text:'<b>Delete</b>',
            type:'button-positive',
            onTap:function(e){
              MainService.removeUser(clickedUser._id).success(function(el){
                getUsers()
              })
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
                        last:d.last,
                        first:d.first
                   }
                   console.log(inviteeObject,'inviteeObject')
                   console.log(d.text,'d.text')
                   console.log(d.text === 'true','is true')
                   MainService.inviteToEvent(inviteeObject,d.admin).success(function(el){
                     if(d.text === 'true' && el.success !== false){
                         console.log('send text')
                         MainService.sendTextInvite(inviteeObject);
                     }
                      if(el.success != false){
                        MainService.sendEmailInvite(inviteeObject);
                        getUsers()
                      }
                      console.log(el,'success')
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
        $scope.googleContactPop = function(response){

          $scope.googleContactInfo = response;
          var  contactIndexs = []
          $scope.addIndex = function(bool,index){
            if(bool){
              $scope.myClass = 'blueHigh';
              contactIndexs.push(index)
            }else{
              var index = contactIndexs.indexOf(index);
              if (index > -1) {
                contactIndexs.splice(index, 1);
              }
            }
          }
          $scope.googleInviteData = {}
          var d = $scope.googleInviteData;
          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            templateUrl: 'templates/googlePop.html',
            title: 'Invite Google Contacts',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) {
                  var googleInvites = [];
                  contactIndexs.forEach(function(el){
                    googleInvites.push($scope.googleContactInfo[el])
                  })
                  console.log(googleInvites,'googleInvites')
                  googleInvites.forEach(function(el){

                          var inviteeObject = {
                            username : el.email,
                            email: el.email,
                            last: el.name.split(' ')[1],
                            first:el.name.split(' ')[0],
                            phone: '',
                          }
                          console.log(inviteeObject,'invitee Object')
                    MainService.inviteToEvent(inviteeObject,el.admin).success(function(el){
                        if(el.success !== false){
                          console.log('send email')
                          MainService.sendEmailInvite(inviteeObject);
                        }
                      getUsers()
                    })

                  })

                }
              }
            ]
          });
         };


  })
})();
