(function() {
  'use strict';

  describe('service channel', function() {
    var channel;

    beforeEach(module('beattweakApp'));
    beforeEach(inject(function(_channel_) {
      channel = _channel_;
    }));

    it('should be registered', function() {
      expect(channel).not.toEqual(null);
    });

    describe('getChannels function', function() {
      it('should exist', function() {
        expect(channel.getTec).not.toEqual(null);
      });

      it('should return array of object', function() {
        var data = channel.getChannels();
        expect(data).toEqual(jasmine.any(Array));
        expect(data[0]).toEqual(jasmine.any(Object));
        expect(data.length > 0).toBeTruthy();
      });
    });
  });
})();
