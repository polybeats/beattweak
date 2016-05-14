'use strict';

describe('Directive: roomBrowser', function () {

  // load the directive's module and view
  beforeEach(module('beattweakApp'));
  beforeEach(module('app/components/roomBrowser/roomBrowser.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<room-browser></room-browser>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the roomBrowser directive');
  }));
});
