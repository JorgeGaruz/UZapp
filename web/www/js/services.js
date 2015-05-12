
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

      console.log("alcanzado");
   var ggl = new L.Google('ROADMAP');

   var MIN_ZOOM = 15;
   var INIT_ZOOM = 14;
   var MAX_ZOOM = 15;

   //Centro ciudad
   var INI_LAT = 41.653496;
   var INI_LON = -0.889492;

   var map = L.map('mapa').setView([INI_LAT, INI_LON], INIT_ZOOM);
   map.attributionControl.setPrefix('');
   map.addLayer(ggl);

   /*L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM
   }).addTo(map);*/

   L.marker([41.647673, -0.887874]).addTo(map)
       .bindPopup("<div class=\"text-center\"><b>Campus Gran Vía, Facultad Económicas</b><br>C/Doctor Cerrada, 1-3</div>");

   L.marker([41.642305, -0.897683]).addTo(map)
       .bindPopup("<div class=\"text-center\"><b>Campus San Francisco</b><br>C/Pedro Cerbuna, 12</div>");

   L.marker([41.683029, -0.883228]).addTo(map)
       .bindPopup("<div class=\"text-center\"><b>Campus Rio Ebro, Betancourt</b><br>C/María de Luna, s/n</div>");

   L.marker([41.681527, -0.883861]).addTo(map)
       .bindPopup("<div class=\"text-center\"><b>Campus Rio Ebro, Lorenzo Normante</b><br>C/María de Luna, s/n</div>");

   L.marker([41.634882, -0.861936]).addTo(map)
       .bindPopup("<div class=\"text-center\"><b>Campus Veterinaria, Hospital Clínico</b><br>1ª planta, pasillo Admón. de Patología</div>");

   L.marker([42.142172, -0.405557]).addTo(map)
       .bindPopup("<div class=\"text-center\"><b>Campus Huesca</b><br>Ronda Misericordia, 5</div>");

   L.marker([40.351661, -1.110081]).addTo(map)
       .bindPopup("<div class=\"text-center\"><b>Vicerrectorado Campus Teruel</b><br>C/Ciudad Escolar, s/n</div>");


  };



 });
