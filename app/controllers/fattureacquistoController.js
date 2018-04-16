var acquisto = angular.module('acquisto', []);
var log = require('electron-log');


//controller dei prodotti
acquisto.controller('acquistoCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var id;
    $scope.fatture = getFatture();


    function getFatture() {

        $http({
                url: 'http://localhost:8080' + '/getfattureacquisto',
                method: "GET"

            })
            .then(function (response) {
                $scope.fatture = response.data;
                log.info('$scope.fatture : ', $scope.fatture);
            });
    }

    $scope.aggiungiFattura = function ($nuovaFattura) {
        $http({
                url: 'http://localhost:8080' + '/aggiungifattura',
                method: "POST",
                data: $nuovaFattura

            })
            .then(function (response) {

                log.info('Fattura appena aggiunto : ', response.data);
                getFatture();
                $nuovaFattura.nome = "";
                $nuovaFattura.data = "";
                       
            });


    }
    $scope.eliminaFattura = function ($id) {
        log.info('id: ' + $id);
        $http({
                url: 'http://localhost:8080' + '/eliminafattura/' + $id,
                method: "DELETE"

            })
            .then(function (response) {

                log.info('fattura appena eliminata : ', response.data);
                getFatture();

            });


    }

    $scope.idFatturaDaModificare = function ($idfattura) {
        id = $idfattura;
    }

    $scope.modificaFattura = function ($questaFattura) {

        $http({
                url: 'http://localhost:8080' + '/modificafattura',
                method: "PUT",
                data: {
                    dati: $questaFattura,
                    _id: id
                }
            })
            .then(function (response) {
                log.info('fattura appena modificato : ', response.data);
                getClienti();
                $questaFattura.nome = "";
                $questaFattura.indirizzo = "";
                $questaFattura.piva = "";
                $questaFattura.sconto = "";
            });


    }




}]);