
var app = angular.module('starter.services', []);


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

        $scope.map = L.map('mapa'
            ,{
                crs: L.CRS.EPSG3857,
                layers: ggl
             }
        ).setView([$scope.factorias[opcion].latitud, $scope.factorias[opcion].longitud], INIT_ZOOM);
        $scope.map.attributionControl.setPrefix('');
        //$scope.map.addLayer(ggl);


        var OSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            id: 'OSM'
        });

        var baseMaps = {
            "OSM": OSM,
            "Google Roadmap": ggl,
            "Google Satelite": satelite,
            "Google Hibrida": hybrid
        };
        L.control.layers(baseMaps, {}, {position: 'bottomleft'}).addTo($scope.map);


        L.marker([41.647673, -0.887874]).addTo($scope.map)
            .bindPopup("<div class=\"text-center\"><b>Campus Gran Vía, Facultad Económicas</b><br>C/Doctor Cerrada, 1-3</div>");

        L.marker([41.642305, -0.897683]).addTo($scope.map)
            .bindPopup("<div class=\"text-center\"><b>Campus San Francisco</b><br>C/Pedro Cerbuna, 12</div>");

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


        //var mywms = L.tileLayer.wms("http://155.210.14.31:8080/geoserver/proyecto/wms", {
        var mywms = L.tileLayer.wms("http://155.210.14.31:8080/geoserver/wms", {
            layers: 'proyecto:csf_1017_00',
            format: 'image/png',
            transparent: true,
            version: '1.3.0'
        });
        console.log(mywms);
        mywms.addTo($scope.map);


        var geojsonLayer = new L.GeoJSON().addTo($scope.map);

        $.ajax({
           // url : "http://geoserver.capecodgis.com/geoserver/capecodgis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=capecodgis:tracts_2010_4326&maxFeatures=2&outputFormat=json&format_options=callback:getJson",
            url: "http://155.210.14.31:8080/geoserver/proyecto/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=proyecto:csf_1017_00,proyecto:csf_1017_01&srsName=epsg:4326&outputFormat=text/javascript&format_options=callback:getJson",
            dataType : 'jsonp',
            jsonpCallback: 'getJson',
            success: handleJson
        });
        function handleJson(data) {
            console.log(data)
            geojsonLayer.addData(data);
            //$scope.map.addLayer(geojsonLayer);
        }



        return $scope.map;
    };

    this.localizarZaragoza= function ($scope,miFactoria){
        $scope.factorias = miFactoria.datosMapa;
        $scope.map.setView(new L.LatLng($scope.factorias.contentItem[0].latitud, $scope.factorias.contentItem[0].longitud), 14);
    };
    this.localizarHuesca= function ($scope,miFactoria){
        $scope.factorias = miFactoria.datosMapa;
        console.log($scope.factorias[1].nombre+$scope.factorias[1].latitud+$scope.factorias[1].longitud);
        console.log($scope.mapa);
        var mapa =$scope.mapa;
        mapa.setView(new L.LatLng($scope.factorias[1].latitud, $scope.factorias[1].longitud), 14);
    };

});