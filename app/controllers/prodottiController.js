var prodotti = angular.module('prodotti', []);

//controller dei prodotti
prodotti.controller('prodottiCtrl', ['$scope', '$http', function ($scope,$http) {

    $scope.rimuoviProdotto = function (prodotto) {
        var prodottorimosso = $scope.prodotti.indexOf(prodotto);
        $scope.prodotti.splice(prodottorimosso, 1);
    }
   console.log('ciaoo');
    $scope.getProdotti= function(){
       
        $http({
            method: 'GET',
            url: '#/getprodotti'
        }).then(function successCallback(response) {
            if(response.data){
                console.log('prodotto : '+ response.data)
              
                $scope.prodotti=$scope.getProdotti();
            }
                else console.log('errore');

                // Non faccio niente

        })
    
    };
   
    
    
    
    $scope.aggiungiProdotto = function ($nuovoProdotto) {
        console.log('prodotto da aggiungere:' + JSON.stringify($nuovoProdotto));

        $http({
            method: 'POST',
            url: '#/aggiungiprodotto',
            data: {
                'prodotto': $nuovoProdotto
            }
        }).then(function successCallback(response) {
            if(response.data){
                console.log('prodotto : '+ response.data)
                console.log('prodotto aggiunto!' + response.status);
                $scope.prodotti=$scope.getProdotti();
            }
                else console.log('errore');

                // Non faccio niente

        })
    };

 



}]);