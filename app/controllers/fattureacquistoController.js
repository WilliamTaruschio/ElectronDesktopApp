var acquisto = angular.module('acquisto', []);
var log = require('electron-log');

acquisto.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
}]);
//service che fa l'upload del file insieme all'id della relativa fattura
acquisto.service('fileUploadService', ['$http', '$q', function ($http, $q) {
    var id;
    this.uploadFileToUrl = function (file, idFatturaInviata, uploadUrl) {
        log.info('url : ' + uploadUrl);
        log.info('file : ' + JSON.stringify(file));
        var fileFormData = new FormData();
        fileFormData.append('file', file);
        fileFormData.append('fattura', idFatturaInviata);

        var deffered = $q.defer();

        $http({
                url: uploadUrl,
                method: 'POST',
                data: fileFormData,
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .then(function (response) {


            })

        return deffered.promise;
    }
}]);
//controller dei prodotti
acquisto.controller('acquistoCtrl', ['$scope', '$http', '$location','$sce', 'fileUploadService', function ($scope, $http, $location,$sce, fileUploadService) {
    var id;
    $scope.percorsoFile;
    $scope.fatture = getFatture();
    var idFatturaInviata;

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

        //aggiunge la fattura con data e nome e id del file vuoto
        $http({
                url: 'http://localhost:8080' + '/aggiungifattura',
                method: "POST",
                data: $nuovaFattura


            })
            .then(function (response) {
                idFatturaInviata = response.data._id;

                log.info('Fattura appena aggiunto : ', idFatturaInviata);
                getFatture();
                $nuovaFattura.nome = "";
                $nuovaFattura.data = "";
                if ($scope.myFile) { // se c'è un file da uploadare usa il service fileUploadService
                    var file = $scope.myFile;
                    log.info('Fattura  : ', idFatturaInviata);
                    var uploadUrl = 'http://localhost:8080' + '/upload', //Url of web service
                        promise = fileUploadService.uploadFileToUrl(file, idFatturaInviata, uploadUrl);

                }
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
    $scope.idFileFattura = function ($idfilefattura) {
        log.info('filename del file relativo alla fattura : ', $idfilefattura);
        var fileURL;
        $http({
                url: 'http://localhost:8080' + '/files/' + $idfilefattura,
                method: "GET",
                encoding:null

            })
            .then(function (response) {
                var file = new Blob([response.data], {type: 'application/pdf'});
                 fileURL = URL.createObjectURL(file);
                log.info('fileurl : ', fileURL);
                var decode=unescape(response.data);
               log.info('file get : ', decode);
                log.info('file tipo : ', typeof(response.data));
                $scope.percorsoFile=$sce.trustAsResourceUrl(fileURL+'.pdf');
               // $scope.percorsoFile=response.data;
            });
           
                
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