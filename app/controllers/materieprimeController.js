var materie = angular.module('materie', []);
var log = require('electron-log');


//controller dei prodotti
materie.controller('materieprimeCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var id;
    $scope.materie = getMaterieprime();


    function getMaterieprime() {

        $http({
                url: 'http://localhost:8080' + '/getmaterie',
                method: "GET"

            })
            .then(function (response) {
                $scope.materie = response.data;
                log.info('$scope.materie : ', $scope.materie);
            });
    }

    $scope.aggiungiMateria = function ($nuovaMateria) {
        $http({
                url: 'http://localhost:8080' + '/aggiungimateria',
                method: "POST",
                data: $nuovaMateria

            })
            .then(function (response) {

                log.info('prodotto appena aggiunto : ', response.data);
                getMaterieprime();
                $nuovaMateria.nome = "";
                $nuovaMateria.icni = "";
                $nuovaMateria.confezione = "";
                $nuovaMateria.prezzo = "";
                $nuovaMateria.fornitore = "";           
            });


    }
    $scope.eliminaMateria = function ($id) {
        log.info('id: ' + $id);
        $http({
                url: 'http://localhost:8080' + '/eliminamateria/' + $id,
                method: "DELETE"

            })
            .then(function (response) {

                log.info('materia prima appena eliminato : ', response.data);
                getMaterieprime();

            });


    }

    $scope.idMateriaDaModificare = function ($idmateria) {
        id = $idmateria;
    }

    $scope.modificaMateria = function ($questaMateria) {

        $http({
                url: 'http://localhost:8080' + '/modificamateria',
                method: "PUT",
                data: {
                    dati: $questaMateria,
                    _id: id
                }
            })
            .then(function (response) {

                log.info('materia appena modificato : ', response.data);
                getMaterieprime();
                $questaMateria.nome = "";
                $questaMateria.icni = "";
                $questaMateria.confezione = "";
                $questaMateria.prezzo = "";
                $questaMateria.fornitore = "";   
            });


    }




}]);