
 var app = angular.module('starter.services', []);


 app.service('geoService', function () {

  return ({
  // placeBaseMap: placeBaseMap
   //removeOverlays: removeOverlays,
   //locateUser: locateUser
   crearMapa: crearMapa
  });



/* function locateUser($scope){
   $scope.map.locate({setView: true, enableHighAccuracy: true, maxZoom: 20});
  };*/

  function crearMapa($scope){


   var MIN_ZOOM = 15;
   var INIT_ZOOM = 17;
   var MAX_ZOOM = 18;

   //San Francisco
   var TER_LAT = 40.351661;
   var TER_LON = -1.110081;

   var map = L.map('map-teruel').setView([TER_LAT, TER_LON], INIT_ZOOM);
   map.attributionControl.setPrefix('');

   L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM
   }).addTo(map);

   L.marker([TER_LAT, TER_LON]).addTo(map)
       .bindPopup("<div class=\"text-center\"><b>Vicerrectorado Campus Teruel</b><br>C/Ciudad Escolar, s/n</div>");

   var popup = L.popup();

  };


 });
