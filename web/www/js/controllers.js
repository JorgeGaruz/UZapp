(function(){
  var app = angular.module('starter.controllers',[]);

  /**********************************************************************
   * AppCtrl: Controlador principal de la aplicación.
   ***********************************************************************/
  app.controller('AppCtrl', function($scope, $timeout, $state) {

    // Timeout para ir a home
    $timeout(function() {
      $state.go('app.home');
    }, 2000);
  });

  /**************************************************************************
   * TopCtrl: Controlador encargado de redirigir la aplicación a la pantalla
   *          de splash en caso de refresco de página
   ***********************************************************************/
  app.controller('TopCtrl', function($location){
    $location.path("/");
  });

})();
