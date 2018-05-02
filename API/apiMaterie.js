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
        if (err) log.info('non salvato :', err); // saved!
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
    log.info('dati grezzi: ' + JSON.stringify(req.body.dati));

    if (req.body.dati.nome != "") nome = req.body.dati.nome;
    if (req.body.dati.icni != "")  icni = req.body.dati.icni;
    if (req.body.dati.confezione != null)  confezione = req.body.dati.confezione;
    if (req.body.dati.prezzo != null)  prezzo = req.body.dati.prezzo;
    if (req.body.dati.fornitore != "")  fornitore = req.body.dati.fornitore;
    var materiamodificato = {
        nome: nome,
        icni: icni,
        confezione: confezione,
        prezzo: prezzo,
        fornitore: fornitore
    }
    log.info('id: ' + JSON.stringify(query));
    log.info('dati materia: ' + JSON.stringify(materiamodificato));
    Materie.update(query, {
        $set: materiamodificato
    }, function (err) {
        if (err) log.info('non modificato'); // saved!
        else {
            res.status(201).json(materiamodificato);
        }
    });

}