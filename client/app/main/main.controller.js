'use strict';
 (function() {

  class MainController {

    constructor($scope, $http, $rootScope, drumMachine, socket) {
      var rs = $rootScope;
      var dm = drumMachine;
      var vm = this;

      rs.loading = true;
      vm.$http = $http;
      vm.socket = socket;
      vm.users = [];
      vm.actions = [];
      // begin old stuff
      vm.creationDate = new Date();
      
      drumMachine.loadInstruments()
        .then(function () {
          rs.loading = false;
          rs.dm = dm;
          rs.bpm = dm.tempo();
        });
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
        socket.unsyncUpdates('user');
      });
    }
      // Socket listeners
      // ================
      $onInit() {
        this.$http.get('/api/things').then(response => {
          this.actions = response.data;
          this.socket.syncUpdates('thing', this.actions);
        });
        this.$http.get('/api/users').then(response => {
          this.users = response.data;
          this.socket.syncUpdates('user', this.users);
        });
      }

      // These methods for controller, not manually adding users or actions right now
      /*addAction() {
        if (this.newAction) {
          this.$http.post('/api/actions', { name: this.newAction });
          this.newAction = '';
        }
      }

      deleteThing(action) {
        this.$http.delete('/api/actions/' + action._id);
      }*/

     /* socket.on('init', function (data) {
        $scope.name = data.name;
        $scope.users = data.users;
      });

      socket.on('send:message', function (message) {
        $scope.actions.push(message);
      });

      socket.on('change:name', function (data) {
        changeName(data.oldName, data.newName);
      }); 

      socket.on('user:join', function (data) {
        this.actions.push({
          user: 'chatroom',
          text: 'User ' + data.name + ' has joined.'
        });
        this.users.push(data.name);
      }); */

      // add a message to the conversation when a user disconnects or leaves the room
/*      socket.on('user:left', function (data) {
        this.actions.push({
          user: 'chatroom',
          text: 'User ' + data.name + ' has left.'
        });

      });*/

      // Private helpers
      // ===============

     /* var changeName = function (oldName, newName) {
        // rename user in list of users
        var i;
        for (i = 0; i < $scope.users.length; i++) {
          if (this.users[i] === oldName) {
            this.users[i] = newName;
          }
        }

        this.actions.push({
          user: 'chatroom',
          text: 'User ' + oldName + ' is now known as ' + newName + '.'
        });
      }*/

      // Methods published to the scope
      // ==============================

      /*$scope.changeName = function () {
        socket.emit('change:name', {
          name: $scope.newName
        }, function (result) {
          if (!result) {
            alert('There was an error changing your name');
          } else {

            changeName($scope.name, $scope.newName);

            $scope.name = $scope.newName;
            $scope.newName = '';
          }
        });
      };

      $scope.sendMessage = function () {
        socket.emit('send:message', {
          message: $scope.message
        });

        // add the message to our model locally
        vm.actions.push({
          user: $scope.name,
          text: $scope.message
        });

        // clear message box
        $scope.message = '';
      }; 
      */

    }
angular
  .module('beattweakApp')
  .controller('MainController',MainController);
})();
