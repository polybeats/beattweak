(function() {
  'use strict';
  var mac_mock = {
    _id: 0,
    name: 'New Room',
    tempo: 140,
    bar_resolution: 8,
    grid_length: 16,
    channels: [
      
    ]
  };
var ch_names = ['Kick', 'Snare', 'Hi-hat', 'Rimshot'], channel = {index: 0, beats: []}
for(var i = 0; i < mac_mock.grid_length; i++) {
  channel.beats.push(false);
}
mac_mock.channels = ch_names.map(function(name, i) {
  return {name: name, index: i, beats: channel.beats};
})


  describe('service channel', function() {
    var channel, dm;

    beforeEach(module('beattweakApp'));
    // run machine config
    beforeEach(inject(function(_channel_, _drumMachine_) {
      channel = _channel_;
      dm = _drumMachine_;
      dm.loadMachine(mac_mock);
      dm.loadInstruments();
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
