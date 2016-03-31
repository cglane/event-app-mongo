describe('Controllers', function(){
    var scope;

    // load the controller's module
    beforeEach(module('starter.controllers'));

    var scope,
       controller;
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
      //   var fakePromise = $q.when();
      //  spyOn(MainService, 'facebookAuth')and.returnValue(fakePromise);
       MainService.registerUser = jasmine.createSpy("registerUser() spy").andCallFake(function() {
         console.log("Hello from getName()");
         return "Bobby";
       });
        // scope.say();
        // expect(scope.hello).toEqual('charles');
    });
    // it('should have enabled friends to be true', function(){
    //     var fakePromise = $q.when();
    //    spyOn(MainService, 'facebookAuth')and.returnValue(fakePromise);
    //     scope.say();
    //     expect(scope.hello).toEqual('charles');
    // });
});
