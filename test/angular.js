describe('main', function () {

  beforeEach(module('main'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('register a user', function () {
		it('register user', function () {
      var $scope = {}
			var controller = $controller('MainController', { $scope: $scope });
      $scope.one = 3;
      // $scope.testFun();
      console.log($scope.two)
      expect($scope.registerUser()).toEqual(true);
		});
    it('this is amazing', function () {
			var $scope = {};
			var controller = $controller('MainController', { $scope: $scope });
			expect(1).toEqual(1);
		});
	});

});
