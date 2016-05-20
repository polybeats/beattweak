'use strict';

describe('Directive: btDrumMachine', function () {

  // load the directive's module and view
  beforeEach(module('beattweakApp'));
  beforeEach(module('app/components/drumMachine/drumMachine.html'));

  var element, scope, vm;

  beforeEach(inject(function ($rootScope, _$controller_) {
    scope = $rootScope.$new();
    vm = _$controller_('dmController');
  }));
/*
  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bt-drum-machine></bt-drum-machine>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the roomBrowser directive');
  }));*/

  it('should define more than 1 channel', function() {
    expect(angular.isArray(vm._dm.rows)).toBeTruthy();
    expect(vm._dm.rows.length > 1).toBeTruthy();
  });
});
