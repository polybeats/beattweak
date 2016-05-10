(function() {
  'use strict';

  angular
    .module('beattweakApp')
    .directive('btNavbar', btNavbar);

  /** @ngInject */
  function btNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment) {
      var vm = this;

      vm.freesound_auth = "https://www.freesound.org/apiv2/oauth2/authorize/?client_id=" + 
        "70d56c921dd7f8ed69a7&response_type=code";

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
