(function() {
  'use strict';

  angular
    .module('beattweakApp')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdThemingProvider, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    // theme settings
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey').dark();
      
    $locationProvider.html5Mode(true);
  }

})();
