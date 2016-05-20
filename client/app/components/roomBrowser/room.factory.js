(function() {
  'use strict';
  angular
  .module('beattweakApp')
  .factory('Rooms', ['$resource', function($resource) {
    var room = $resource('/api/rooms/:roomId', {roomId: '@id'},
      {
        'update': { method:'PUT' }
      });
    room.prototype.channels = [];


    return room;
  }]);
})();
