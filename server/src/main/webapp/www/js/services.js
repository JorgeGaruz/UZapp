
var app = angular.module('starter.services', []);

var mapa;//La unica manera que he encontrado de modificar la vista del mapa desde el menú(ya que usan distintos controladores) es por var.global
var edificios = ["csf_1018_","csf_1110_00","csf_1106_00"];
app.service('geoService', function () {


    this.crearMapa = function($scope,miFactoria,opcion){




/////////////////////////////////////////////////////////////////////////
        console.log("alcanzado");
        $scope.factorias = miFactoria.datosMapa;
        var ggl = new L.Google('ROADMAP');
        var satelite = new L.Google('SATELLITE');
        var hybrid = new L.Google('HYBRID');
       // console.log($scope.lon.toString());
        var MIN_ZOOM = 15;
        var INIT_ZOOM = 14;
        var MAX_ZOOM = 15;

        //Centro ciudad
        var INI_LAT = 41.653496;
        var INI_LON = -0.889492;



        /*var OSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            id: 'OSM'
        });
        //No funciona bien con geoserver y WMS
*/

        var baseMaps = {
            //"OSM": OSM,
            "Google Roadmap": ggl,
            "Google Satelite": satelite,
            "Google Hibrida": hybrid
        };


        $scope.map = L.map('mapa'
            ,{
                crs: L.CRS.EPSG3857,
                layers: ggl
            }
        ).setView([$scope.factorias[opcion].latitud, $scope.factorias[opcion].longitud], INIT_ZOOM);
        $scope.map.attributionControl.setPrefix('');
        L.control.layers(baseMaps, {}, {position: 'bottomleft'}).addTo($scope.map);


        L.marker([41.647673, -0.887874]).addTo($scope.map)
            .bindPopup("<div class=\"text-center\"><b>Campus Gran Vía, Facultad Económicas</b><br>C/Doctor Cerrada, 1-3</div>");

        var html = '<div id="popup" class=\"text-center\"><b>Campus San Francisco</b><br>C/Pedro Cerbuna, 12</div> Seleccionar planta <select class="ion-input-select" ng-change="selectPlano(plantaPopup)" ng-model="plantaPopup" >' +
        '<option value="1">1</option>'+
        '<option value="2">2</option>' +
        '<option value="3">SS</option>' +
        '</select>';

         L.marker([41.642305, -0.897683]).addTo($scope.map)
             .bindPopup(html);

        L.marker([41.683029, -0.883228]).addTo($scope.map)
            .bindPopup("<div class=\"text-center\"><b>Campus Rio Ebro, Betancourt</b><br>C/María de Luna, s/n</div>");

        L.marker([41.681527, -0.883861]).addTo($scope.map)
            .bindPopup("<div class=\"text-center\"><b>Campus Rio Ebro, Lorenzo Normante</b><br>C/María de Luna, s/n</div>");

        L.marker([41.634882, -0.861936]).addTo($scope.map)
            .bindPopup("<div class=\"text-center\"><b>Campus Veterinaria, Hospital Clínico</b><br>1ª planta, pasillo Admón. de Patología</div>");

        L.marker([42.142172, -0.405557]).addTo($scope.map)
            .bindPopup("<div class=\"text-center\"><b>Campus Huesca</b><br>Ronda Misericordia, 5</div>");

        L.marker([40.351661, -1.110081]).addTo($scope.map)
            .bindPopup("<div class=\"text-center\"><b>Vicerrectorado Campus Teruel</b><br>C/Ciudad Escolar, s/n</div>");

        //var mywms;
        for (i=0;i<edificios.length;i++){
            var mywms = L.tileLayer.wms("http://155.210.14.31:8080/geoserver/wms", {
                layers: 'proyecto:'+edificios[i],
                format: 'image/png',
                transparent: true,
                version: '1.3.0'
            });
            console.log(mywms);
            $scope.map.addLayer(mywms);
            añadirMarcadores($scope,i);
            /*L.marker([mywms['_map']['layers']['31']['latlng']['lat'], mywms['_map']['_layers']['31']['latlng']['lng']]).addTo($scope.map)
                .bindPopup("<div class=\"text-center\"><b>HOLA</b></div>");*/

       }


        //var mywms = L.tileLayer.wms("http://155.210.14.31:8080/geoserver/proyecto/wms", {
        /*var mywms = L.tileLayer.wms("http://155.210.14.31:8080/geoserver/wms", {
            layers: 'proyecto:csf_1018_,proyecto:csf_1110_00,proyecto:csf_1106_00',
            format: 'image/png',
            transparent: true,
            version: '1.3.0'
        });
        console.log(mywms);
        //mywms.addTo($scope.map);
        $scope.map.addLayer(mywms);*/




        /*var owsrootUrl = 'http://155.210.14.31:8080/geoserver/ows';

        var defaultParameters = {
            service : 'WFS',
            version : '1.0.0',
            request : 'GetFeature',
            typeName : 'proyecto:csf_1018_',
            outputFormat : 'text/javascript',
            format_options : 'callback:getJson',
            SrsName : 'EPSG:3857'
        };

        var parameters = L.Util.extend(defaultParameters);
        var URL = owsrootUrl + L.Util.getParamString(parameters);

        console.log(URL);
        var WFSLayer = null;
        var ajax = $.ajax({
            url : URL,
            dataType : 'jsonp',
            jsonpCallback : 'getJson',
            success : function (response) {
                /*WFSLayer = L.geoJson(response, {
                    style: function (feature) {
                        return {
                            stroke: false,
                            fillColor: 'FFFFFF',
                            fillOpacity: 0
                        };
                    },
                    onEachFeature: function (feature, layer) {
                        popupOptions = {maxWidth: 200};
                        layer.bindPopup("Popup text, access attributes with feature.properties.ATTRIBUTE_NAME"
                            ,popupOptions);
                    }
                }).addTo(map);
                console.log(response);
            }
        });*/


        mapa = $scope.map;
        return $scope.map;
    };
    /*
    Función encargada de añadir el marcador sobre el edificio para mostrar después la información de dicho edificio
     */
    function añadirMarcadores($scope,index){
        var geojsonLayer = new L.GeoJSON().addTo($scope.map);
        var url = "http://155.210.14.31:8080/geoserver/proyecto/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=proyecto:"+edificios[index]+"&srsName=epsg:3857&outputFormat=text/javascript&format_options=callback:getJson"
        console.log(url);
        $.ajax({
            // url : "http://geoserver.capecodgis.com/geoserver/capecodgis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=capecodgis:tracts_2010_4326&maxFeatures=2&outputFormat=json&format_options=callback:getJson",
            url: url,
            dataType : 'jsonp',
            jsonpCallback: 'getJson',
            success: handleJson
        });
        function handleJson(data) {
            var coordenadas = data.features[0].geometry.coordinates[0][0][0];
            console.log(coordenadas);
            var latLng = toLatLng(coordenadas[1], coordenadas[0], $scope.map);
            console.log(latLng);
            //geojsonLayer.addData(data);
            //$scope.map.addLayer(geojsonLayer);
            L.marker([latLng.lat, latLng.lng]).addTo($scope.map)
                .bindPopup("hoooooola");
        }
    }

    function toLatLng(x, y, map) {
        var projected = L.point(y, x).divideBy(6378137);
        return map.options.crs.projection.unproject(projected);
    }

    this.localizarZaragoza= function ($scope,miFactoria){
        $scope.factorias = miFactoria.datosMapa;
        console.log('Cambio vista a: '+ $scope.factorias[0].nombre+$scope.factorias[0].latitud+$scope.factorias[0].longitud);
        mapa.setView(new L.LatLng($scope.factorias[0].latitud, $scope.factorias[0].longitud), 14);
    };
    this.localizarHuesca= function ($scope,miFactoria){
        $scope.factorias = miFactoria.datosMapa;
        console.log('Cambio vista a: '+ $scope.factorias[1].nombre+$scope.factorias[1].latitud+$scope.factorias[1].longitud);
        mapa.setView(new L.LatLng($scope.factorias[1].latitud, $scope.factorias[1].longitud), 16);
    };
    this.localizarTeruel= function ($scope,miFactoria){
        $scope.factorias = miFactoria.datosMapa;
        console.log('Cambio vista a: '+ $scope.factorias[2].nombre+$scope.factorias[2].latitud+$scope.factorias[2].longitud);
        mapa.setView(new L.LatLng($scope.factorias[2].latitud, $scope.factorias[2].longitud), 16);
    };

});