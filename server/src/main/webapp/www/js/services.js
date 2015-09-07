
var app = angular.module('starter.services', []);

var mapa;//La unica manera que he encontrado de modificar la vista del mapa desde el menú(ya que usan distintos controladores) es por var.global
var edificios = ["CSF_1018_","CSF_1110_00","CSF_1106_00"];
app.service('geoService', function () {


    this.crearMapa = function($scope,miFactoria,opcion, GetInfoService){

        $scope.factorias = miFactoria.datosMapa;
        var ggl = new L.Google('ROADMAP');
        var satelite = new L.Google('SATELLITE');
        var hybrid = new L.Google('HYBRID');

        var MIN_ZOOM = 15;
        var INIT_ZOOM = 14;
        var MAX_ZOOM = 15;

        //Centro ciudad
        var INI_LAT = 41.653496;
        var INI_LON = -0.889492;

        /*var OSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            id: 'OSM'
        });*/
        //No funciona bien con geoserver y WMS


        var baseMaps = {
           // "OSM": OSM,
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

        L.control.locate().addTo($scope.map);

        L.marker([41.647673, -0.887874]).addTo($scope.map)
            .bindPopup("<div class=\"text-center\"><b>Campus Gran Vía, Facultad Económicas</b><br>C/Doctor Cerrada, 1-3</div>");

        var html = '<div id="popup" class=\"text-center\"><b>Campus San Francisco</b><br>C/Pedro Cerbuna, 12</div> Seleccionar planta <select id="prueba" class="ion-input-select" onchange="selectPlano(this)" ng-model="plantaPopup" >' +
        '<option value="1">1</option>'+
        '<option value="2">2</option>' +
        '<option value="3">SS</option>' +
        '</select>';

         L.marker([41.642305, -0.897683]).addTo($scope.map)
             .bindPopup(html);
        $('#prueba').change(function() {
            console.log("select alcanzado");
        });


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
            var mywms = L.tileLayer.wms("http://155.210.14.31:8080/geoserver/wms", {//Seria interesante probar con L.tileLayer.betterWMS
                layers: 'proyecto:'+edificios[i].toLowerCase(),
                format: 'image/png',
                transparent: true,
                version: '1.3.0'
            });
            $scope.map.addLayer(mywms);
            $( document ).ready(function() {
                añadirMarcadores($scope,i,GetInfoService)
            });
            /*L.marker([mywms['_map']['layers']['31']['latlng']['lat'], mywms['_map']['_layers']['31']['latlng']['lng']]).addTo($scope.map)
                .bindPopup("<div class=\"text-center\"><b>HOLA</b></div>");*/

       }

        mapa = $scope.map;
        return $scope.map;
    };
    /*
    Función encargada de añadir el marcador sobre el edificio para mostrar después la información de dicho edificio
     */
    function añadirMarcadores($scope,index,GetInfoService){

        //var geojsonLayer = new L.GeoJSON().addTo($scope.map);
        var url = "http://155.210.14.31:8080/geoserver/proyecto/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=proyecto:"+edificios[index].toLowerCase()+"&srsName=epsg:4326&outputFormat=application/json";
            //&outputFormat=text/javascript&format_options=callback:getJson"
        console.log(url);
        $.ajax({
            url : "http://155.210.14.31:8080/geoserver/proyecto/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=proyecto:"+edificios[index].toLowerCase()+"&srsName=epsg:4326&outputFormat=application/json",
            dataType : 'json',
            success: handleJson
        });
        function handleJson(data) {
            var coordenadas = data.features[0].geometry.coordinates[0][0][0];
           GetInfoService.getInfoEdificio(edificios[index].split("_").join(".").substring(0,9)).then(//Para adecuar el edificio a la bd
                function (dataEdificio) {
                    if (dataEdificio.length == 0){
                        $rootScope.resultadoInfoEdificioVacio = true;
                    }
                    $scope.descripcion =dataEdificio;

                    var edificio = $scope.descripcion[0];

                    var html = '<div id="popup" class=\"text-center\"><b>'+edificio.edificio+'</b><br>'+edificio.direccion+'</div> Seleccionar planta <select class="ion-input-select" onchange="selectPlano(this)" ng-model="plantaPopup" >';
                    for (i=0;i<edificio.plantas.length;i++){//Bucle para cargar en el select todas las plantas
                        html+='<option value="'+edificio.plantas[i]+'">'+edificio.plantas[i]+'</option>';
                    }
                    html+='</select>';

                    L.marker([coordenadas[1], coordenadas[0]]).addTo($scope.map)
                        .bindPopup(html);
                    /*var popupElement = $('#select'); // grab the element (make sure that it exists in the DOM)
                    popupElement = $compile(popupElement)($scope); // let angular know about it*/

                    $('#'+edificios[index].toLowerCase()).change(function() {
                        console.log("select alcanzado");
                    });
                }

            );

        }
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
    this.crearPlano= function ($scope,$http){
        var mywms = L.tileLayer.wms("http://155.210.14.31:8080/geoserver/wms", {
            layers: 'proyecto:CSF_1018_',
            format: 'image/png',
            transparent: true,
            version: '1.3.0'
        });

        $scope.plan = L.map('plan', {
            layers: [mywms]
        }).setView([0, 0], 20);


        /*$scope.plan = L.map('plan', {
            maxZoom: 20,
            minZoom: 20,
            crs: L.CRS.Simple
        }).setView([0, 0], 20);

        console.log(mywms);
        L.tileLayer(mywms, {
            attribution: 'WMS',
        }).addTo($scope.plan);*/
        //$scope.plan.addLayer(mywms);

        /*$.ajax({
            url : "http://155.210.14.31:8080/geoserver/proyecto/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=proyecto:csf_1110_00&srsName=epsg:4326&outputFormat=application/json",
            dataType : 'json',
            success: handleJson
        });
        function handleJson(data) {
            console.log(data);
            L.geoJson(data).addTo($scope.plan);
        }*/

    }

});