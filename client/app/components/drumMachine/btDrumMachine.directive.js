(function() {
  'use strict';

  angular
    .module('beattweakApp')
    .directive('btDrumMachine', btDrumMachine);

  /** @ngInject */
  function btDrumMachine() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/drumMachine/drumMachine.html',
      scope: {
          'dm': '=',
          'bpm': '='
      },
      controller: dmController,
      controllerAs: 'Ctrl'
    };

    return directive;

    /** @ngInject */
    function dmController($scope, $rootScope, drumMachine, $log, socket) {
      var _s = $scope;
      var _dm = drumMachine;



      socket.socket.on('room:play', function(data){
          $log.debug('playing from socket event')
        if (!_dm.playing()){
          _dm.play();
          _s.rhythmIndex = _dm.rhythmIndex;
          _s.playing = true;
        }});
      socket.socket.on('room:pause', function(data){
        $log.debug('pausing from socket event')
        if (_dm.playing()){
          _dm.stop();
          _s.playing = false;
        }});

      socket.socket.on('room:beatUpdate', function(data){
        $log.debug('update beats from socket event, channel: ' + angular.toJson(data))
        _dm.updateBeats(data);
      });      

      // Update the tempo
      _s.updateTempo = function() {
        _s.dm.setTempo(_s.bpm);
      };

      _s.togglePlay = function () {
        if (_dm.playing()) {
          $log.debug('stop clock')
          _dm.stop();

          socket.socket.emit('room:pause');
        } else {
          $log.debug('start clock')
          socket.socket.emit('room:play');
          _dm.play();
          _s.rhythmIndex = _dm.rhythmIndex;
          // toggleCol(s.currentBeat);
        }
        
        _s.playing = _s.dm.playing();
      };

      // Not workign currently, try to just put channel func into drum machien directive
      // _s.$watch(_dm.rhythmIndex, function(newVal, oldVal) {
      //   _s.$digest()
      // })
      
      /*getChannels();
      s.currentBeat = 0;
      s.numCols = 16;
      s.bpm = 120;
      s.playing = false;
      s.togglePlay = togglePlay;
      s.clear = clear;
      s.incrementStep = incrementStep;*/
    }
  }

})();
