(function() {
  'use strict';

  angular
    .module('beattweakApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('home.login', {
        url: '/login',
        templateUrl: 'app/components/login/loginModal.html',
        controller: 'LoginModalCtrl',
        controllerAs: 'login'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
