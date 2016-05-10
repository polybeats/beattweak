(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    
    beforeEach(module('beatTweak'));
    beforeEach(inject(function(_$controller_, _channel_) {
      spyOn(_channel_, 'getChannels').and.returnValue([{}, {}, {}, {}, {}]);
      // spyOn(_toastr_, 'info').and.callThrough();

      vm = _$controller_('MainController');
/*      $timeout = _$timeout_;
      toastr = _toastr_;*/
    }));

    it('should have a timestamp creation date', function() {
      expect(vm.creationDate).toEqual(jasmine.any(Number));
    });

/*    it('should define animate class after delaying timeout ', function() {
      $timeout.flush();
      expect(vm.classAnimation).toEqual('rubberBand');
    });

    it('should show a Toastr info and stop animation when invoke showToastr()', function() {
      vm.showToastr();
      expect(toastr.info).toHaveBeenCalled();
      expect(vm.classAnimation).toEqual('');
    });*/

    it('should define more than 1 channel', function() {
      expect(angular.isArray(vm.channels)).toBeTruthy();
      expect(vm.channels.length > 1).toBeTruthy();
    });
  });
})();
