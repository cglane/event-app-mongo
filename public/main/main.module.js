(function () {
  "use strict";

  var underscore = angular.module('underscore', []);
          underscore.factory('_', function() {
              return window._;
          });
  var jquery = angular.module('jquery', []);
          jquery.factory('$', function() {
          return window.$;
        });


  angular
    .module('main', [
      'ngRoute',
      'ui.router',
      'underscore',
      'jquery'
    ])

    .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider

          // HOME STATES AND NESTED VIEWS ========================================
          .state('landing', {
              url: '/',
              controller:'MainController',
              templateUrl: 'main/views/landing.html'
          })
          .state("main",{
            url:'/main',
            controller:'MainController',
            templateUrl: 'main/views/main.html'
          })
          .state("facebook",{
            url:'/facebook/:token/:currId',
            controller:'FacebookController',
            templateUrl: 'main/views/facebook.html'
          })


  });






})();
