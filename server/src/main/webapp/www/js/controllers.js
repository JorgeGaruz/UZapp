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
    $scope.myTrigger = function(arg){
      alert(arg + ' clicked');
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

  app.controller('SearchCtrl', function($scope,$rootScope, GetInfoService) {
    GetInfoService.getEspacios().then(
        function (data) {
          $rootScope.codigoEspacios = data;
          console.log(data);
          if (data.length == 0){
            $rootScope.resultadoCodigoEspacioVacio = true;
          }

        }
    );

    $scope.selectCiudad = function(ciudad) {//Cuando selecciono una ciudad, tengo que traerme los campus de dicha ciudad
      console.log(ciudad);
      GetInfoService.getCampus(ciudad).then(
          function (data) {
            $rootScope.campus = data;
            console.log(data);
            if (data.length == 0){
              $rootScope.resultadoCampusVacio = true;
            }

          }
      );

    }
  });

})


();


/**********************************************************************
 * FACTORY: Servicio que define todas las llamadas al web service para recoger los datos
 ***********************************************************************/
app.factory('GetInfoService', function($http, $q, $timeout, $state, $rootScope) {
  var URI = 'http://localhost:8080/busquedas';
  //var URI = 'http://155.210.14.31:8080/busquedas';

  //Llamada AJAX al web service para recoger los codigos de espacio para rellenar el SELECT de busqueda
  var getEspacios = function () {
    var deferred = $q.defer();
    var request = {
      method: 'GET',
      url: URI + '/codigoespacios',
      contentType: 'application/json',
      dataType: "json"
    };
    $timeout(function () {
      $http(request).then(
          function (result) {
            deferred.resolve(result.data);
          },
          function(err){
            console.log(err.status);
            $rootScope.resultadoEspacioError = true;
          }
      );
    });
    return deferred.promise;
  };

  //Llamada AJAX al web service para recoger los campus segun la ciudad el SELECT de busqueda
  var getCampus = function (ciudad) {
    var deferred = $q.defer();
    var request = {
      method: 'GET',
      url: URI + '/campus',
      contentType: 'application/json',
      dataType: "json",
      data: angular.toJson(ciudad)
    };
    console.log(request);
    $timeout(function () {
      $http(request).then(
          function (result) {
            deferred.resolve(result.data);
          },
          function(err){
            console.log(err.status);
            $rootScope.resultadoCiudadError = true;
          }
      );
    });
    return deferred.promise;
  };

  //Definición de las funciones anteriores para poder ser utilizadas
  return {
    getEspacios: getEspacios,
    getCampus: getCampus
  };
});

