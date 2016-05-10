(function() {
  'use strict';

  angular
    .module('beattweakApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
