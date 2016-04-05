(function(){
"use strict";

angular
  .module('starter')
  .controller('ChatDetailCtrl', function($scope, $stateParams, MainService) {
    $scope.chat = MainService.get($stateParams.chatId);
  })
})();
