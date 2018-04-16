var fornitori = angular.module('fornitori', []);
var log = require('electron-log');


//controller dei prodotti
fornitori.controller('fornitoriCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var id;
    $scope.fornitori = getFornitori();


    function getFornitori() {

        $http({
                url: 'http://localhost:8080' + '/getfornitori',
                method: "GET"

            })
            .then(function (response) {
                $scope.fornitori = response.data;
                log.info('$scope.fornitori : ', $scope.fornitori);
            });
    }

    $scope.aggiungiFornitore = function ($nuovoFornitore) {
        $http({
                url: 'http://localhost:8080' + '/aggiungifornitore',
                method: "POST",
                data: $nuovoFornitore

            })
            .then(function (response) {

                log.info('fornitore appena aggiunto : ', response.data);
                getFornitori();
                $nuovoFornitore.nome = "";
                $nuovoFornitore.indirizzo = "";
                $nuovoFornitore.piva = "";
               
                       
            });


    }
    $scope.eliminaFornitore = function ($id) {
        log.info('id: ' + $id);
        $http({
                url: 'http://localhost:8080' + '/eliminafornitore/' + $id,
                method: "DELETE"

            })
            .then(function (response) {

                log.info('fornitore appena eliminato : ', response.data);
                getFornitori();

            });


    }

    $scope.idFornitoreDaModificare = function ($idfornitore) {
        id = $idfornitore;
    }

    $scope.modificaFornitore = function ($questoFornitore) {

        $http({
                url: 'http://localhost:8080' + '/modificafornitore',
                method: "PUT",
                data: {
                    dati: $questoFornitore,
                    _id: id
                }
            })
            .then(function (response) {
                log.info('fornitore appena modificato : ', response.data);
                getFornitori();
                $questoFornitore.nome = "";
                $questoFornitore.indirizzo = "";
                $questoFornitore.piva = "";
               
            });


    }




}]);