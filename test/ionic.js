describe('Controllers', function(){
    var scope;

    // load the controller's module
    beforeEach(module('starter.controllers','starter.services'));

    var scope,
       controller,
       MainService;
    beforeEach(inject(function($rootScope, $controller, _MainService_) {
    scope = $rootScope.$new();
    MainService = _MainService_;
    controller = $controller('DashCtrl', {
      '$scope': scope,
      'MainService': {
        MainService: function() {
          return null;
        }
      }
    });
  }));

    // tests start here
    it('should enable facebook login', function(){

    });

});
