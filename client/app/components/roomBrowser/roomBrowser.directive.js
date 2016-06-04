'use strict';

angular.module('beattweakApp')
  .directive('roomBrowser', function () {
    
    /** @ngInject */
    function BrowserController(moment, $mdSidenav, $scope, $log) {
      var browser = this;

      browser.closeLeftMenu = function() {
        $mdSidenav('left').toggle();
      }

      browser.create = function(newName) {
        $scope.roomNdx = $scope.rooms.length;
        $scope.createRoom(newName);
      }

      browser.select = function(index) {
        $log.debug('selecting index ' + index);
        $scope.roomNdx = index;
        $scope.selectRoom($scope.rooms[index]);
      }

      browser.remove = function(index) {

        
        if (index !== $scope.roomNdx){
          if (index < $scope.roomNdx) {$scope.roomNdx--;}
          $log.debug('removing index ' + index + ', during index: ' + $scope.roomNdx);
          $scope.deleteRoom(index);
          // if (index < $scope.roomNdx) {$scope.roomNdx--;}
        }

      }
    }

    return {
      templateUrl: 'app/components/roomBrowser/roomBrowser.html',
      restrict: 'E',
      scope: {
        roomNdx: "=",
        rooms: '=',
        createRoom: '=',
        selectRoom: '=',
        deleteRoom: '='
      },
      link: function (scope, element, attrs) {
        // scope.roomNdx = 0;
      },
      controller: BrowserController,
      controllerAs: 'browser'
    };
  });
