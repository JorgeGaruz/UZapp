(function(){
  var app = angular.module('starter.controllers',[]);

  app.factory('miFactoria', function(){
    return {
      datosMapa: [{
        nombre: "Zaragoza",
        latitud: 41.653496,
        longitud: -0.889492
      },
        {
          nombre: "Huesca",
          latitud: 42.142172,
          longitud: -0.405557
        },
        {
          nombre: "Teruel",
          latitud: 40.351661,
          longitud: -1.110081
        }]
    };
  });
  var opcion;
  var mapa;
  /**********************************************************************
   * AppCtrl: Controlador principal de la aplicación.
   ***********************************************************************/
  app.controller('AppCtrl',function($scope,$rootScope,geoService,miFactoria) {

    // Si la pulsación ha sido en la vista de inicio
    $scope.Huesca = function() {
      console.log("huesca");

      opcion=1;
      if(!(typeof mapa == 'undefined')){//Para cambiar la vista del mapa Huesca
        $scope.mapa=mapa;
        geoService.localizarHuesca($scope.mapa,miFactoria);
      }
    }
    $scope.Zaragoza = function() {
      console.log("zaragoza");

      opcion=0;
      if(!(typeof mapa == 'undefined')){//Para cambiar la vista del mapa Zaragoza
        $scope.mapa=mapa;
        geoService.localizarZaragoza($scope.mapa,miFactoria);
      }

    }
    $scope.Teruel = function() {
      console.log("teruel");

      opcion=2;
      if(!(typeof mapa == 'undefined')){//Para cambiar la vista del mapa Teruel
        $scope.mapa=mapa;
        geoService.localizarTeruel($scope.mapa,miFactoria);
      }
    }

  });

  /**********************************************************************
   * MapCtrl: Controlador de Leaflet
   ***********************************************************************/
  app.controller('MapCtrl',function($scope, $rootScope, $ionicPopup, $http, $filter,geoService,miFactoria) {

    console.log(typeof $scope.mapa);
    if(!(typeof $scope.mapa == 'undefined')){

      geoService.localizarHuesca($scope,miFactoria);
    }
    mapa=geoService.crearMapa($scope,miFactoria,opcion);
    console.log(mapa);


    /*var formatter = new OpenLayers.Format.WMSCapabilities();
    //var endpoint = "path/to/wms/endpoint";
    var layers = [];

    // async call to geoserver (I'm using angular)
    $http.get('http://155.210.14.31:8080/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities').

        success(function(data, status, headers, config) {

          // use the tool to parse the data
          var response = (formatter.read(data));

          console.log(response);

          // this object contains all the GetCapabilities data
          var capability = response.capability;

          // I want a list of names to use in my queries
          for(var i = 0; i < capability.layers.length; i ++){
            layers.push(capability.layers[i].name);
            console.log(capability.layers[i].name);
          }
        }).

        error(function(data, status, headers, config) {
          alert("terrible error logging..");
        });
*/
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

