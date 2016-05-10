(function() {
  'use strict';

  angular
    .module('beattweakApp')
    .directive('btRow', btRow);

  /** @ngInject */
  function btRow() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/drumMachine/row/row.html',
      scope: {
          'channel': '=',
          'numCols': '=',
          'startBeat': '=',
          'stopBeat': '=',
          'channelIndex': '='
      },
      controller: rowController,
      controllerAs: 'vm'
    };

    return directive;

    /** @ngInject */
    function rowController($scope) {
      var _s = $scope;

      // "vm.creation" is avaible by directive option "bindToController: true"
      // vm.relativeDate = moment(vm.creationDate).fromNow();
      // console.log('cols: ' + vm.numCols)
      _s.toggleActive = function(index) {
        var seq = _s.channel.getSequence();
        if (index < seq.length) {
          if (seq[index].active) {
            _s.stopBeat(_s.channelIndex, index);
          } else {
            _s.startBeat(_s.channelIndex, index);
          }
          seq[index].toggle()
        }
      }
    }
  }

})();
