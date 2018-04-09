var mongoose = require('mongoose');
var Prodotti = require('../models/Prodotti.js');
var log = require('electron-log');
var ObjectID = require("mongodb").ObjectID;
var db;
exports.setDb = function (extdb) {
    db = extdb;
};


exports.aggiungiprodotto = function (req, res) {
    log.info("POST prodotto");
    log.info("req.body ++++  " + JSON.stringify(req.body));
    var nuovoProdotto = new Prodotti({
        nome: req.body.nome,
        descrizione: req.body.descrizione,
        prezzo: req.body.prezzo,
    });
    log.info('nuovoprodotto' + nuovoProdotto);
    nuovoProdotto.save(function (err) {
        if (err) log.info('non salvato'); // saved!
        else {
            res.status(201).json(nuovoProdotto);
        }
    });
}


exports.listaprodotti = function (req, res) {
    log.info("GET prodotti");
    Prodotti.find({}).then(function (docs) {
        log.info("prodotti : " + docs);
        return res.json(docs);

    });
}
exports.eliminaprodotto = function (req, res) {
    log.info("elimina prodotto");
    log.info("req.params ++++  " + JSON.stringify(req.params.id));


    Prodotti.remove({
        _id: ObjectID(req.params.id)
    }, function (err) {
        if (err) log.info('non eliminato'); // saved!
        else {
            res.status(201).json(req.params.id);
        }
    });
}