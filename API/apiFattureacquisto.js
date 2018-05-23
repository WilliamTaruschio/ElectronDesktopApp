var mongoose = require('mongoose');
var Acquisto = require('../models/Acquisto.js');
var log = require('electron-log');
var ObjectID = require("mongodb").ObjectID;
var db;
exports.setDb = function (extdb) {
    db = extdb;
};


exports.aggiungifattura = function (req, res) {
    log.info("POST fattura");
    log.info("req.body ++++  " + JSON.stringify(req.body));
    log.info("id del file ++++  " + JSON.stringify(req.body._id));
    var nuovoFattura = new Acquisto({
        data: req.body.data,
        nome: req.body.nome,
        idfile: req.body._id
    });

    nuovoFattura.save(function (err) {
        if (err) log.info('non salvato :', err); // saved!
        else {
            res.status(201).json(nuovoFattura);
        }
    });
}

//ottiente la lista di tutti clienti presenti nel sistema
exports.listafatture = function (req, res) {
    log.info("GET fatture");
    Acquisto.find({}).then(function (docs) {
        log.info("fatture : " + docs);
        return res.json(docs);

    });
}
//elimina il cliente in base all'id passato come parametro
exports.eliminafattura = function (req, res) {
    log.info("elimina fattura");
    log.info("req.params ++++  " + JSON.stringify(req.params.id));


    Acquisto.remove({
        _id: ObjectID(req.params.id)
    }, function (err) {
        if (err) log.info('non eliminata'); // saved!
        else {
            res.status(201).json(req.params.id);
        }
    });
}

//funziona che modifica i dati del cliente esistente
exports.modificafattura = function (req, res) {
    var query = {
        _id: ObjectID(req.body._id)
    }
    log.info('dati grezzi: ' + JSON.stringify(req.body.dati));
    if (req.body.dati.data != "" && req.body.dati.data != null) data = req.body.dati.data;
    if (req.body.dati.nome != "" && req.body.dati.nome != null) nome = req.body.dati.nome;


    var fatturamodificata = {
        data: data,
        nome: nome

    }
    log.info('id: ' + JSON.stringify(query));
    log.info('dati fattura: ' + JSON.stringify(fatturamodificata));
    Acquisto.update(query, {
        $set: fatturamodificata
    }, function (err) {
        if (err) log.info('non modificata'); // saved!
        else {
            res.status(201).json(fatturamodificata);
        }
    });

}