var mongoose = require('mongoose');
var Prodotti = require('../models/Prodotti.js');

var ObjectID = require("mongodb").ObjectID;
var db;
exports.setDb = function(extdb) {
    db = extdb;
};


exports.aggiungiprodotto = function (req, res) {
    
    var nuovoProdotto = new Prodotti({
        nome: req.body.nome,
        descrizione: req.body.descrizione,
        prezzo: req.body.prezzo,
    });
console.log('nuovoprodotto'+nuovoProdotto);
nuovoProdotto.save(function(err) {
    if (err)alert('non salvato');// saved!
    else {
        res.status(201).send(nuovoProdotto);
    }
});
}


exports.listaprodotti = function (req, res) {
    console.log("GET prodotti");
    db.collection(Prodotti).find({}).toArray(function(err, docs) {
        if (err) {
            console.log("Operazione di recupero dei prodotti fallita.");
        } else {
            res.status(200).json(docs);
        }
});
}