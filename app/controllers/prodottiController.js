var prodotti = angular.module('prodotti', []);
var log = require('electron-log');


//controller dei prodotti
prodotti.controller('prodottiCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.prodotti;
    getProdotti();

    function getProdotti() {

        $http({
                url: 'http://localhost:8080' + '/getprodotti',
                method: "GET"

            })
            .then(function (response) {
                $scope.prodotti = response.data;
                log.info('$scope.prodotti : ', $scope.prodotti);
            });
    }

    $scope.aggiungiProdotto = function ($nuovoprodotto) {
        $http({
                url: 'http://localhost:8080' + '/aggiungiprodotto',
                method: "POST",
                data: $nuovoprodotto

            })
            .then(function (response) {

                log.info('prodotto appena aggiunto : ', response.data);
                getProdotti();
                $nuovoprodotto.nome="";
                $nuovoprodotto.descrizione="";
                $nuovoprodotto.prezzo="";
            });
           

    }
    $scope.eliminaProdotto = function ($id) {
        log.info('id: ' +$id);
        $http({
                url: 'http://localhost:8080' + '/eliminaprodotto/'+$id,
                method: "DELETE"

            })
            .then(function (response) {

                log.info('prodotto appena eliminato : ', response.data);
                getProdotti();
              
            });
           

    }





}]);