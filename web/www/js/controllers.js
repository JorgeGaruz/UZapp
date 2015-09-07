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
  app.controller('MapCtrl',function($scope, $rootScope, $ionicPopup, $http, $filter,geoService,miFactoria, GetInfoService) {

    mapa=geoService.crearMapa($scope,miFactoria,opcion, GetInfoService);
    console.log(mapa);

    $scope.selectPlano = function(planta) {//Selecciono un plano de la planta seleccionada.
      console.log("alcanzado");
      window.location = "templates/plano.html"
    }

  });

  /**********************************************************************
   * PlanCtrl: Controlador del plano del edificio en  Leaflet
   ***********************************************************************/
  app.controller('PlanCtrl',function($scope, $rootScope, $ionicPopup, $http, $filter,geoService,miFactoria, GetInfoService) {

    //mapa=geoService.crearMapa($scope,miFactoria,opcion, GetInfoService);
    console.log(mapa);
    geoService.crearPlano($scope,$http, GetInfoService);

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

    $scope.busquedaEspacios = function() {
      GetInfoService.getEspacios().then(
          function (data) {
            $rootScope.codigoEspacios = data;
            console.log(data);
            if (data.length == 0){
              $rootScope.resultadoCodigoEspacioVacio = true;
            }

          }
      );
      document.getElementById('codEspacio').style.display= 'block' ;//Para mostar el select con el codigo de espacio después de pulsar el boton y rellenarlo
    }

    $scope.selectCampus = function(ciudad) {//Cuando selecciono una ciudad, tengo que traerme los campus de dicha ciudad

        GetInfoService.getCampus(ciudad).then(
            function (data) {
              $rootScope.Campus = data;
              console.log(data);
              if (data.length == 0){
                $rootScope.resultadoCampusVacio = true;
              }

            }
        );
    }

    $scope.selectEdificio = function(campus) {//Cuando selecciono un campus, tengo que traerme los edificios de dicho campus

      GetInfoService.getEdificio(campus).then(
          function (data) {
            $rootScope.Edificio = data;
            console.log(data);
            if (data.length == 0){
              $rootScope.resultadoEdificioVacio = true;
            }

          }
      );
    }

    $scope.selectPlanta = function(edif) {//Cuando selecciono un edificio, tengo que buscar el numero de plantas de dicho edificio

      for (x=0;x<$rootScope.Edificio.length;x++){
        if($rootScope.Edificio[x].ID_Edificio==edif){//Saber el edificio selecionado que tenemos que incluir el Select de plantas
          $rootScope.Planta = $rootScope.Edificio[x].plantas;
        }
      }
    }


  });

})


();


/**********************************************************************
 * FACTORY: Servicio que define todas las llamadas al web service para recoger los datos
 ***********************************************************************/
app.factory('GetInfoService', function($http, $q, $timeout, $state, $rootScope) {
  var URI_busquedas = 'http://localhost:8080/busquedas';
  var URI_estancias = 'http://localhost:8080/estancias';
  //var URI_busquedas = 'http://155.210.14.31:8080/mapa/busquedas';
  //var URI_busquedas = 'http://155.210.14.31:8080/mapa/estancias';

  //Llamada AJAX al web service para recoger los codigos de espacio para rellenar el SELECT de busqueda
  var getEspacios = function () {
    var deferred = $q.defer();
    var request = {
      method: 'GET',
      url: URI_busquedas + '/codigoespacios',
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

  //Llamada AJAX al web service para recoger los campus segun la ciudad del SELECT de busqueda
  var getCampus = function (ciudad) {
    var deferred = $q.defer();
    var request = {
      method: 'GET',
      url: URI_busquedas + '/campus?ciudad='+ciudad,
      contentType: 'application/json',
      dataType: "json"
    };
    console.log(request);
    $timeout(function () {
      $http(request).then(
          function (result) {
            deferred.resolve(result.data);
          },
          function(err){
            console.log(err.status);
            $rootScope.resultadoCampusError = true;
          }
      );
    });
    return deferred.promise;
  };

  //Llamada AJAX al web service para recoger los edificios segun el campus del SELECT de busqueda
  var getEdificio = function (campus) {
    var deferred = $q.defer();
    var request = {
      method: 'GET',
      url: URI_busquedas + '/edificio?campus='+campus,
      contentType: 'application/json',
      dataType: "json"
    };
    console.log(request);
    $timeout(function () {
      $http(request).then(
          function (result) {
            deferred.resolve(result.data);
          },
          function(err){
            console.log(err.status);
            $rootScope.resultadoEdificioError = true;
          }
      );
    });
    return deferred.promise;
  };

  //Llamada AJAX al web service para recoger el plano segun la planta escogida en el SELECT
  var getPlano = function (planta) {
    var deferred = $q.defer();
    var request = {
      method: 'GET',
      url: URI + '/edificio?campus='+campus,
      contentType: 'application/json',
      dataType: "json"
    };
    console.log(request);
    $timeout(function () {
      $http(request).then(
          function (result) {
            deferred.resolve(result.data);
          },
          function(err){
            console.log(err.status);
            $rootScope.resultadoEdificioError = true;
          }
      );
    });
    return deferred.promise;
  };

  //Llamada AJAX al web service para recoger la informacion del edificio(nombre, direccion y numero de plantas)
  var getInfoEdificio = function (edificio) {
    var deferred = $q.defer();
    var request = {
      method: 'GET',
      url: URI_busquedas + '/infoedificio?edificio='+edificio,
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
            $rootScope.resultadoEdificioError = true;
          }
      );
    });
    return deferred.promise;
  };

  var getInfoEstancia = function (estancia) {
    var deferred = $q.defer();
    var request = {
      method: 'GET',
      url: URI_estancias + '/id_estancia?estancia='+estancia,
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
            $rootScope.resultadoEdificioError = true;
          }
      );
    });
    return deferred.promise;
  };

  //Definición de las funciones anteriores para poder ser utilizadas
  return {
    getEspacios: getEspacios,
    getCampus: getCampus,
    getEdificio: getEdificio,
    getInfoEdificio:getInfoEdificio,
    getInfoEstancia:getInfoEstancia
  };
});

