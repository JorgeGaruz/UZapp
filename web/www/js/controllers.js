(function(){
  var app = angular.module('starter.controllers',[]);


  /**********************************************************************
   * AppCtrl: Controlador principal de la aplicación.
   ***********************************************************************/
  app.controller('AppCtrl', function($scope, $timeout, $state) {

    // Timeout para ir a home
   // $timeout(function() {
     // $state.go('app.home');}, 2000);

    $scope.salirPagina = function() {
      var confirmPopup = $ionicPopup.confirm({
        template: '<div id="texto-popup"><strong>¿Desea salir?</strong><br/></div>',
        okText: 'SÍ',
        cancelText: 'NO'
      });
      confirmPopup.then(function(res) {
        if(res) {
          $window.close();
        }
      });
    };

  });

  /**********************************************************************
   * MapCtrl: Controlador de Leaflet
   ***********************************************************************/
  app.controller('MapCtrl',function($scope, $rootScope, $ionicPopup, $http, $filter) {

    var MIN_ZOOM = 15;
    var INIT_ZOOM = 17;
    var MAX_ZOOM = 18;

    //Gran Vía
    var GRAN_LAT = 41.647673;
    var GRAN_LON = -0.887874;

    var map = L.map('mapa').setView([GRAN_LAT, GRAN_LON], INIT_ZOOM);
    map.attributionControl.setPrefix('');

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM
    }).addTo(map);

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

