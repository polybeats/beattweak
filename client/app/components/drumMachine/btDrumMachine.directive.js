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
    function dmController($scope, $rootScope, drumMachine, $log) {
      var _s = $scope;
      var _dm = drumMachine;


      // Update the tempo
      _s.updateTempo = function() {
        _s.dm.setTempo(_s.bpm);
      };

      _s.togglePlay = function () {
        if (_dm.playing()) {
          $log.debug('stop clock')
          _dm.stop();
        } else {
          $log.debug('start clock')
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
