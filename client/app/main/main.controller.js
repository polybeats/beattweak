(function() {
  'use strict';

  angular
    .module('beattweakApp')
    .controller('MainController', MainController);

  function MainController($scope, $rootScope, drumMachine) {
    var vm = this;
    var rs = $rootScope;
    var dm = drumMachine;
        
    rs.loading = true;

    // begin old stuff
    vm.creationDate = new Date();
    
    drumMachine.loadInstruments()
      .then(function () {
        rs.loading = false;
        rs.dm = dm;
        rs.bpm = dm.tempo();
      });

  }


  function SecureController($scope, $rootScope, drumMachine) {
    var vm = this;
    var rs = $rootScope;
    var dm = drumMachine;
        
    rs.loading = true;

    // begin old stuff
    vm.creationDate = new Date();
    
    drumMachine.loadInstruments()
      .then(function () {
        rs.loading = false;
        rs.dm = dm;
        rs.bpm = dm.tempo();
      });

  }

  MainController.$inject = ['$scope', '$rootScope', 'drumMachine'];
  SecureController.$inject = MainController.$inject;
})();
