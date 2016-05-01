'use strict';

angular.module('beattweakApp.auth', [
  'beattweakApp.constants',
  'beattweakApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
