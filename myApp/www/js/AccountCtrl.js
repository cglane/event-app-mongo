(function(){
"use strict";

angular
  .module('starter')
  .controller('AccountCtrl', function($ionicPopup,$scope,MainService, Upload,$window) {


    var vm = this;
       vm.submit = function(){ //function to call on form submit
         console.log('submit')
           if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
               vm.upload(vm.file); //call upload function
           }
       }

       vm.upload = function (file) {
           Upload.upload({
               url: '/uploadphotos', //webAPI exposed to upload the file
               data:{file:file}, //pass file as data, should be user ng-model

           }).then(function (resp) { //upload function returns a promise
               if(resp.data.error_code === 0){ //validate success
                  //  $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                   //save picture into event object
                   console.log(resp.data.filename,'filename')
                   $scope.currEvent.avatar = resp.data.filename;
                   MainService.editEvent($scope.currEvent).success(function(el){
                     console.log(el,'el')
                   })
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
            console.log(el,'el');
            // ($scope.currEvent.avatar)? vm.avatar = $scope.currEvent.avatar: '';
       })
       $scope.submitEvent = function(){
         console.log('submitEvent')
         console.log($scope.currEvent)
         MainService.editEvent($scope.currEvent).success(function(el){
           localStorage.setItem('eventTitle',el.eventTitle)
           console.log(el.location)
         })
       }

  });
})();
