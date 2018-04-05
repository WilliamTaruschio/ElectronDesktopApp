var prodotti = angular.module('prodotti', []);
var log = require('electron-log');
var CRUD=require('C:/Users/willi/ElectronDesktopApp/API/api.js')

//controller dei prodotti
prodotti.controller('prodottiCtrl', ['$scope', '$http', function ($scope, $http) {

    

   
   log.info('ciao '+ CRUD.listaprodotti());
    
   $scope.prodotti = CRUD.listaprodotti();

    
    
    
    $scope.aggiungiProdotto =function(nuovoprodotto){
        CRUD.aggiungiprodotto(nuovoprodotto);
    }
        






}]);