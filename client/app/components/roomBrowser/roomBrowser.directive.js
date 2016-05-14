'use strict';

angular.module('beattweakApp')
  .directive('roomBrowser', function () {
    
    /** @ngInject */
    function BrowserController(moment, $mdSidenav) {
      var browser = this;

      browser.closeLeftMenu = function() {
        $mdSidenav('left').toggle();
      }
    }

    return {
      templateUrl: 'app/components/roomBrowser/roomBrowser.html',
      restrict: 'E',
      scope: {
        users: '=',
        actions: '='
      },
      link: function (scope, element, attrs) {
      },
      controller: BrowserController,
      controllerAs: 'browser'
    };
  });
