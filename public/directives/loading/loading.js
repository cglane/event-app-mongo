(function () {
  "use strict";
  angular
    .module('main')
    .directive('loadingDirective', function () {
      return {
        restrict: 'EA',
        transclue: true,
        templateUrl: './directives/loading/loading.html',
        link: function (scope, element, attributes) {
          setInterval(function () {            
            $('#loading-periods').append('.')
          }, 1000);

        }
      };
    });

})();
