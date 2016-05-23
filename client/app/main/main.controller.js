'use strict';
 (function() {

  class MainController {

    
    constructor($scope, $http, $rootScope, drumMachine, socket, Rooms, $log) {
      var rs = $rootScope;
      var dm = drumMachine;
      var vm = this;

      rs.loading = true;
      vm.$http = $http;
      vm.socket = socket;

      rs.dm = dm;

      $scope.deleteRoom = function(room_idx) {
        var room = vm.rooms[room_idx];
        var rm = Rooms.remove({roomId:room._id}, function() {
          // success
            $log.debug('Room delete success');
            vm.rooms.splice(room_idx, 1);
          
        }, function(err) {
          // error
          $log.error('Room delete error: ' + angular.toJson(err));
        });
      };

      $scope.selectRoom = function(room) {
        console.log('selecting room: ' + angular.toJson(room));
        // TODO: stop/erase current dm
        rs.loading = true;
        dm.loadMachine(room);
        dm.loadInstruments();
        rs.bpm = dm.tempo();
        rs.loading = false;
        // $scope.$apply()
        // TODO: update rest of displays - apply?
      };

      $scope.createRoom = function(newName) {
        var room = new Rooms();

        room.name = newName ? newName : 'New Room';

        room.$save().then(response => {
          // $log.debug('Post response' + angular.toJson(response));
          $scope.selectRoom(response)
          // dm.loadMachine(response);
          // dm.loadInstruments();  
        })
        
      };


      // begin old stuff
      vm.creationDate = new Date();
      
      /* Move to init
        drumMachine.loadInstruments()
        .then(function () {
          rs.loading = false;
          rs.dm = dm;
          rs.bpm = dm.tempo();
        });*/
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
        socket.unsyncUpdates('room');
      });

      vm.rooms = Rooms.query(function() {

          vm.socket.syncUpdates('room', vm.rooms);
          if (vm.rooms.length) { 
            console.log('loading drum config: ' + angular.toJson(vm.rooms[0]))
            drumMachine.loadMachine(vm.rooms[0]);
            drumMachine.loadInstruments()
              .then(function () {
                rs.loading = false;
                rs.dm = dm;
                rs.bpm = dm.tempo();
              });
          }
        });
    }
      // Socket listeners
      // ================
      $onInit() {
        $log.debug('main init!')
        // this.$http.get('/api/rooms')
        Rooms.query().then(response => {
          this.rooms = response;

          this.socket.syncUpdates('room', this.rooms);
          if (this.rooms.length) { 
            console.log('loading drum config: ' + angular.toJson(this.rooms[0]))
            drumMachine.loadMachine(this.rooms[0]);
            drumMachine.loadInstruments()
              .then(function () {
                rs.loading = false;
                rs.dm = dm;
                rs.bpm = dm.tempo();
              });
          }
        });

      }

    }
angular
  .module('beattweakApp')
  .controller('MainController',MainController);
})();
