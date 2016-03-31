(function(){
"use strict";

angular
  .module('main')
  .controller('FacebookController',function($stateParams,$location,$scope){

    var token = $stateParams.token;
    var currId = $stateParams.currId;
      var setItem = function(){
        localStorage.setItem('token',token)
        localStorage.setItem('currId',currId)
      }
      setItem();
      // $location.path('/tab/dash')
});
})();
