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
      controllerAs: 'nav',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $mdSidenav) {
      var nav = this;

      nav.freesound_auth = "https://www.freesound.org/apiv2/oauth2/authorize/?client_id=" + 
        "70d56c921dd7f8ed69a7&response_type=code";

      // "nav.creation" is avaible by directive option "bindToController: true"
      nav.relativeDate = moment(nav.creationDate).fromNow();

      nav.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      }
    }
  }

})();
