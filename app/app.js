// Qui andranno il modulo principale di angular e la sua configurazione con il route provider


var electronApp = angular.module('electronApp', ['ngRoute','prodotti','materie','clienti','fornitori','acquisto']);

electronApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: './app/views/home.html'

        })
        .when('/prodotti', {
            templateUrl: './app/views/prodotti.html',
            controller: 'prodottiCtrl'
        })
        .when('/materieprime', {
            templateUrl: './app/views/materieprime.html',
            controller: 'materieprimeCtrl'
        })
        .when('/clienti', {
            templateUrl: './app/views/clienti.html',
            controller: 'clientiCtrl'
        })
        .when('/fornitori', {
            templateUrl: './app/views/fornitori.html',
            controller: 'fornitoriCtrl'
        })
        .when('/fattureacquisto', {
            templateUrl: './app/views/fattureacquisto.html',
            controller: 'acquistoCtrl'
        })
        .when('/fatturevendita', {
            templateUrl: './app/views/fatturevendita.html',
            
        })
        .otherwise({
            redirectTo: '/home'
        })

}]);