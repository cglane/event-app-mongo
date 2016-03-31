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
      var actual = scope.facebookLogin();
      console.log(actual,'actual')
      expect(actual).not.toBeFalsy();
      //   var fakePromise = $q.when();
      //  spyOn(MainService, 'facebookAuth')and.returnValue(fakePromise);
      //   scope.say();
      //   expect(scope.hello).toEqual('charles');
    });
    // it('should have enabled friends to be true', function(){
    //     var fakePromise = $q.when();
    //    spyOn(MainService, 'facebookAuth')and.returnValue(fakePromise);
    //     scope.say();
    //     expect(scope.hello).toEqual('charles');
    // });
});
