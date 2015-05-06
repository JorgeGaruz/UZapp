// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angularSlideables','ngResource'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
// for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
// org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'AppCtrl'
          })
          .state('splash', {
            url: "/app/splash",
            templateUrl: "templates/splash.html",
            controller: 'AppCtrl'
          })
          .state('app.home', {
            url: "/home",
            views: {
              'menuContent':{
                templateUrl: "templates/home.html",
                controller: 'AppCtrl'
              }
            }
          })
          .state('app.busqueda', {
            url: "/busqueda",
            views: {
              'menuContent':{
                templateUrl: "templates/busqueda.html",
                controller: 'AppCtrl'
              }
            }
          })
          .state('app.favoritos', {
            url: "/favoritos",
            views: {
              'menuContent':{
                templateUrl: "templates/favoritos.html",
                controller: 'AppCtrl'
              }
            }
          })
          .state('app.ajustes', {
            url: "/ajustes",
            views: {
              'menuContent':{
                templateUrl: "templates/ajustes.html",
                controller: 'AppCtrl'
              }
            }
          })
          .state('app.mapa', {
              url: "/mapa",
              views: {
                  'menuContent':{
                      templateUrl: "templates/mapa.html"
                      //controller: 'MapCtrl'
                  }
              }
          })
      ;
// if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/home');
    })






  /*
    .config(function($stateProvider, $urlRouterProvider, $translateProvider) {

      for(lang in translations){
        $translateProvider.translations(lang, translations[lang]);
      }

      $translateProvider.preferredLanguage('en');
    })


var translations = {
  "es": {
    "TITLE": "Hola",
    "hp2": "(On desktop click and drag from left to right)",
    "ht": "Welcome"
  },
  "en": {
    "TITLE": "Hello",
    "hp2": "(Auf dem Desktop klicken und ziehen Sie von links nach rechts)",
    "ht": "willkommen"
  }
}*/
;