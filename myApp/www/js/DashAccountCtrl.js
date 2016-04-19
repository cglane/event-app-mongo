(function(){
"use strict";

angular
  .module('starter')
  .controller('DashAccountCtrl', function($scope,$location,Upload,MainService,$window,$http,$ionicPopup) {


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
                   $scope.userAccount.avatar = resp.data.filename;
                   MainService.updateUser($scope.userAccount).success(function(el){
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
    MainService.getUserInfo().success(function(el){
      $scope.userAccount = el;
      console.log(el,'userAccount')
    })
    $scope.changePassword = function(newPass,confirmPass){
      if(newPass === confirmPass){
        //changePassword
        MainService.changeUserPassword({password:newPass}).success(function(el){
          if(el.success = true){
            $scope.message = 'password changed';
            console.log('password changes')
            $scope.newPassword = '';
            $scope.confirmPassword = '';
          }
        })
      }else{
        //turn input red
        $scope.pVar = true;
      }
    }
    $scope.editUser = function(){
      if(!$scope.userAccount.username.length){
        $scope.uVar = true;
      }else{
        MainService.updateUser($scope.userAccount).success(function(el){
          $scope.userAccount = el.user;
          console.log(el)
        })
      }
    }


  })
})();
