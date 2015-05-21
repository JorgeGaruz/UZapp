(function(){
  var app = angular.module('starter.controllers',[]);


  /**********************************************************************
   * AppCtrl: Controlador principal de la aplicación.
   ***********************************************************************/
  app.controller('AppCtrl', function($scope, $timeout, $state,$ionicPopup, $window) {

    // Timeout para ir a home
   // $timeout(function() {
     // $state.go('app.home');}, 2000);


  });

  /**********************************************************************
   * MapCtrl: Controlador de Leaflet
   ***********************************************************************/
  app.controller('MapCtrl',function($scope, $rootScope, $ionicPopup, $http, $filter,geoService) {

    geoService.crearMapa($scope);

  });
  /**************************************************************************
   * TopCtrl: Controlador encargado de redirigir la aplicación a la pantalla
   *          de splash en caso de refresco de página
   ***********************************************************************/
  app.controller('TopCtrl', function($location){
    $location.path("/");
  })
/*
  app.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $translate) {

    $scope.ChangeLanguage = function(lang){
      $translate.use(lang);
    }

  })*/

    app.controller('TranslationCtrl',['$scope', 'translationService',
      function ($scope, translationService){

        //Run translation if selected language changes
        $scope.translate = function(){
          translationService.getTranslation($scope, $scope.selectedLanguage);
        };

        $scope.changeLanguage = function (langKey) {
          console.log(langKey);
          $scope.selectedLanguage = langKey;
          $scope.translate();
        };

        //Init
        $scope.selectedLanguage = 'es';
        $scope.translate();

      }])

  app.controller('TranslateController', function($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
      console.log(langKey);
      $scope.selectedLanguage = langKey;
      $scope.translate();

    };
  });

})

();

