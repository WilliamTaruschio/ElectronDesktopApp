// Qui andranno il modulo principale di angular e la sua configurazione con il route provider


var electronApp = angular.module('electronApp', ['ngRoute','prodotti']);

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
            controller: 'prodottiCtrl'
        })
        .when('/clienti', {
            templateUrl: './app/views/clienti.html',
            
        })
        .otherwise({
            redirectTo: '/home'
        })

}]);