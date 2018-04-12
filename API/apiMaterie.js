var mongoose = require('mongoose');
var Materie = require('../models/Materieprime.js');
var log = require('electron-log');
var ObjectID = require("mongodb").ObjectID;
var db;
exports.setDb = function (extdb) {
    db = extdb;
};


exports.aggiungimateria = function (req, res) {
    log.info("POST materia");
    log.info("req.body ++++  " + JSON.stringify(req.body));
    var nuovoMateria = new Materie({
        nome: req.body.nome,
        icni: req.body.icni,
        confezione: req.body.confezione,
        prezzo: req.body.prezzo,
        fornitore: req.body.fornitore
    });
  
    nuovoMateria.save(function (err) {
        if (err) log.info('non salvato :',err); // saved!
        else {
            res.status(201).json(nuovoMateria);
        }
    });
}


exports.listamaterie = function (req, res) {
    log.info("GET materie");
    Materie.find({}).then(function (docs) {
        log.info("materie : " + docs);
        return res.json(docs);

    });
}
exports.eliminamateria = function (req, res) {
    log.info("elimina materie");
    log.info("req.params ++++  " + JSON.stringify(req.params.id));


    Materie.remove({
        _id: ObjectID(req.params.id)
    }, function (err) {
        if (err) log.info('non eliminata'); // saved!
        else {
            res.status(201).json(req.params.id);
        }
    });
}
exports.modificamateria = function (req, res) {
    var query = {
        _id: ObjectID(req.body._id)
    }
    var materiamodificato = {
        nome: req.body.nome,
        icni: req.body.icni,
        confezione: req.body.confezione,
        prezzo: req.body.prezzo,
        fornitore: req.body.fornitore
    }
    log.info('id: ' + JSON.stringify(query));
    log.info('dati prodotto: ' + JSON.stringify(materiamodificato));
    Prodotti.update(query, {
        $set: materiamodificato
    }, function (err) {
        if (err) log.info('non modificato'); // saved!
        else {
            res.status(201).json(materiamodificato);
        }
    });

}