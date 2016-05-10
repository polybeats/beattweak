'use strict';

(function(){
  angular
  .module('beattweakApp')
  .factory('freesound', function ($http) {
    
    function downloadSound(sound_id) {

    }

    function searchSounds(query) {

    }

    function login() {
      
    }

    return {
      download: downloadSound,
      search: searchSounds,
      login: login
    };
  });
})();