var mongoose = require('mongoose');
var Clienti = require('../models/Clienti.js');
var log = require('electron-log');
var ObjectID = require("mongodb").ObjectID;
var db;
exports.setDb = function (extdb) {
    db = extdb;
};


exports.aggiungicliente = function (req, res) {
    log.info("POST cliente");
    log.info("req.body ++++  " + JSON.stringify(req.body));
    var nuovoCliente = new Clienti({
        nome: req.body.nome,
        indirizzo: req.body.indirizzo,
        piva: req.body.piva,
        sconto: req.body.sconto
    });

    nuovoCliente.save(function (err) {
        if (err) log.info('non salvato :', err); // saved!
        else {
            res.status(201).json(nuovoCliente);
        }
    });
}

//ottiente la lista di tutti clienti presenti nel sistema
exports.listaclienti = function (req, res) {
    log.info("GET clienti");
    Clienti.find({}).then(function (docs) {
        log.info("clienti : " + docs);
        return res.json(docs);

    });
}
//elimina il cliente in base all'id passato come parametro
exports.eliminacliente = function (req, res) {
    log.info("elimina cliente");
    log.info("req.params ++++  " + JSON.stringify(req.params.id));


    Cliente.remove({
        _id: ObjectID(req.params.id)
    }, function (err) {
        if (err) log.info('non eliminata'); // saved!
        else {
            res.status(201).json(req.params.id);
        }
    });
}

//funziona che modifica i dati del cliente esistente
exports.modificacliente = function (req, res) {
    var query = {
        _id: ObjectID(req.body._id)
    }
    log.info('dati grezzi: ' + JSON.stringify(req.body.dati));

    if (req.body.dati.nome != "" && req.body.dati.nome != null) nome = req.body.dati.nome;
    if (req.body.dati.indirizzo != "" && req.body.dati.indirizzo != null)  indirizzo = req.body.dati.indirizzo;
    if (req.body.dati.piva != "" && req.body.dati.piva != null)  piva = req.body.dati.piva;
    if (req.body.dati.sconto != null) sconto = req.body.dati.sconto;
    
    var clientemodificato = {
        nome: nome,
        indirizzo: indirizzo,
        piva: piva,
        sconto: sconto
    }
    log.info('id: ' + JSON.stringify(query));
    log.info('dati cliente: ' + JSON.stringify(clientemodificato));
    Clienti.update(query, {
        $set: clientemodificato
    }, function (err) {
        if (err) log.info('non modificato'); // saved!
        else {
            res.status(201).json(clientemodificato);
        }
    });

}