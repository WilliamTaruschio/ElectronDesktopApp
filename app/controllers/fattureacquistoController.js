var acquisto = angular.module('acquisto', []);
var log = require('electron-log');

acquisto.directive('fileModel', ['$parse', function($parse){
    return{
        restrict:'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
}]);

acquisto.service('fileUploadService',['$http','$q', function ($http, $q) {

    this.uploadFileToUrl = function (file, uploadUrl) {
        log.info('url : ' + uploadUrl);
        log.info('file : ' + JSON.stringify(file));
        var fileFormData = new FormData();
        fileFormData.append('file', file);

        var deffered = $q.defer();
        $http({
            url:uploadUrl,
            method:'POST',
            data:fileFormData,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        })
        .then(function (response) {
            log.info('inviato : '+JSON.stringify(response.data));

        })

        return deffered.promise;
    }
}]);
//controller dei prodotti
acquisto.controller('acquistoCtrl', ['$scope', '$http', '$location','fileUploadService', function ($scope, $http, $location, fileUploadService) {
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
       
        if ($scope.myFile) {
            var file = $scope.myFile;
            var uploadUrl = 'http://localhost:8080' + '/upload', //Url of web service
                promise = fileUploadService.uploadFileToUrl(file, uploadUrl);

            promise.then(function (response) {
                $scope.serverResponse = response;
                console.log('aggiunti : ' + JSON.stringify(response));
            }, function () {
                $scope.serverResponse = 'An error has occurred';
            })

        }
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