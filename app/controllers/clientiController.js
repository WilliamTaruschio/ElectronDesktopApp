var clienti = angular.module('clienti', []);
var log = require('electron-log');


//controller dei prodotti
clienti.controller('clientiCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var id;
    $scope.clienti = getClienti();


    function getClienti() {

        $http({
                url: 'http://localhost:8080' + '/getclienti',
                method: "GET"

            })
            .then(function (response) {
                $scope.clienti = response.data;
                log.info('$scope.clienti : ', $scope.clienti);
            });
    }

    $scope.aggiungiCliente = function ($nuovoCliente) {
        $http({
                url: 'http://localhost:8080' + '/aggiungicliente',
                method: "POST",
                data: $nuovoCliente

            })
            .then(function (response) {

                log.info('prodotto appena aggiunto : ', response.data);
                getClienti();
                $nuovoCliente.nome = "";
                $nuovoCliente.indirizzo = "";
                $nuovoCliente.piva = "";
                $nuovoCliente.sconto = "";
                       
            });


    }
    $scope.eliminaCliente = function ($id) {
        log.info('id: ' + $id);
        $http({
                url: 'http://localhost:8080' + '/eliminacliente/' + $id,
                method: "DELETE"

            })
            .then(function (response) {

                log.info('materia prima appena eliminato : ', response.data);
                getClienti();

            });


    }

    $scope.idClienteDaModificare = function ($idcliente) {
        id = $idcliente;
    }

    $scope.modificaCliente = function ($questoCliente) {

        $http({
                url: 'http://localhost:8080' + '/modificacliente',
                method: "PUT",
                data: {
                    dati: $questoCliente,
                    _id: id
                }
            })
            .then(function (response) {
                log.info('cliente appena modificato : ', response.data);
                getClienti();
                $questoCliente.nome = "";
                $questoCliente.indirizzo = "";
                $questoCliente.piva = "";
                $questoCliente.sconto = "";
            });


    }




}]);