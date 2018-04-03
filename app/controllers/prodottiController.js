var prodotti = angular.module('prodotti', []);

//controller dei prodotti
prodotti.controller('prodottiCtrl', ['$scope', function ($scope) {

    $scope.rimuoviProdotto = function (prodotto) {
        var prodottorimosso = $scope.prodotti.indexOf(prodotto);
        $scope.prodotti.splice(prodottorimosso, 1);
    }
    $scope.aggiungiProdotto = function (prodotto) {
        $scope.prodotti.push({
            codice: 4,
            nome: $scope.nuovoProdotto.nome,
            descrizione: $scope.nuovoProdotto.descrizione,
            prezzo: $scope.nuovoProdotto.prezzo
        })
        $scope.nuovoProdotto.nome="";
        $scope.nuovoProdotto.descrizione="";
        $scope.nuovoProdotto.prezzo="";
    }

    
    $scope.prodotti = [


        {
            codice:1,
            nome: "crema",
            descrizione: "aaaaa",
            prezzo: 18,
        },
        {
            codice: 2,
            nome: "siero",
            descrizione: "aaaaa",
            prezzo: 35,
        },
        {
            codice: 3,
            nome: "crema mani",
            descrizione: "aaaaa",
            prezzo: 12,
        }

    ];


}]);