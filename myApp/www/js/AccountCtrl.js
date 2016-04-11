(function(){
"use strict";

angular
  .module('starter')
  .controller('AccountCtrl', function($ionicPopup,$scope,MainService, Upload,$window) {

    var vm = this;
       vm.submit = function(){ //function to call on form submit
           if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
               vm.upload(vm.file); //call upload function
           }
       }

       vm.upload = function (file) {
           Upload.upload({
               url: '/uploadphotos', //webAPI exposed to upload the file
               data:{file:file}, //pass file as data, should be user ng-model
               "x-access-token":localStorage.getItem('token')

           }).then(function (resp) { //upload function returns a promise
               if(resp.data.error_code === 0){ //validate success
                   $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
               } else {
                   $window.alert('an error occured');
               }
           }, function (resp) { //catch error
               console.log('Error status: ' + resp.status);
               $window.alert('Error status: ' + resp.status);
           }, function (evt) {
               console.log(evt);
               var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
               console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
               vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
           });
       };


    MainService.getEventInfo().success(function(el){
      $scope.currEvent = el;
      console.log(el,'el')
    })

    $scope.editEvent = function(){
      $scope.eventData = {}
      var d = $scope.eventData;
      d.eventTitle = $scope.currEvent.eventTitle;
      d.city = $scope.currEvent.eventTitle;
      d.state = $scope.currEvent.eventTitle;
      d.zip = $scope.currEvent.eventTitle;
      d.img = $scope.currEvent.pictures[0];
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/editEventPop.html',
        title: 'Edit Event',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Send</b>',
            type: 'button-positive',
            onTap: function(e) {
              if(d.eventTitle){
                //send update
              }else{
                e.preventDefault();
                alert('almost there')
              }
            }
          }
        ]
      });
     };
  });
})();
