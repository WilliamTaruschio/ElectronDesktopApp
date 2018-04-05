var mongoose = require('mongoose');
var Prodotti = require('../models/Prodotti.js');
var log = require('electron-log');
var ObjectID = require("mongodb").ObjectID;
var db;
exports.setDb = function (extdb) {
    db = extdb;
};


exports.aggiungiprodotto = function (req, res) {

    var nuovoProdotto = new Prodotti({
        nome: req.body.nome,
        descrizione: req.body.descrizione,
        prezzo: req.body.prezzo,
    });
    log.info('nuovoprodotto' + nuovoProdotto);
    nuovoProdotto.save(function (err) {
        if (err) alert('non salvato'); // saved!
        else {
            res.status(201).send(nuovoProdotto);
        }
    });
}


exports.listaprodotti = function (req,res) {
    log.info("GET prodotti");
    Prodotti.find({}).then(function (docs) {
        res.send(docs);

    });
}