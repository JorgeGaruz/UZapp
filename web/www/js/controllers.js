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

