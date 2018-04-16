var mongoose = require('mongoose');
var Fornitori = require('../models/Fornitori.js');
var log = require('electron-log');
var ObjectID = require("mongodb").ObjectID;
var db;
exports.setDb = function (extdb) {
    db = extdb;
};


exports.aggiungifornitore = function (req, res) {
    log.info("POST fornitore");
    log.info("req.body ++++  " + JSON.stringify(req.body));
    var nuovoFornitore = new Fornitori({
        nome: req.body.nome,
        indirizzo: req.body.indirizzo,
        piva: req.body.piva,
    });

    nuovoFornitore.save(function (err) {
        if (err) log.info('non salvato :', err); // saved!
        else {
            res.status(201).json(nuovoFornitore);
        }
    });
}

//ottiente la lista di tutti clienti presenti nel sistema
exports.listafornitori = function (req, res) {
    log.info("GET fornitore");
    Fornitori.find({}).then(function (docs) {
        log.info("fornitori : " + docs);
        return res.json(docs);

    });
}
//elimina il cliente in base all'id passato come parametro
exports.eliminafornitore = function (req, res) {
    log.info("elimina fornitore");
    log.info("req.params ++++  " + JSON.stringify(req.params.id));


    Fornitori.remove({
        _id: ObjectID(req.params.id)
    }, function (err) {
        if (err) log.info('non eliminata'); // saved!
        else {
            res.status(201).json(req.params.id);
        }
    });
}

//funziona che modifica i dati del cliente esistente
exports.modificafornitore = function (req, res) {
    var query = {
        _id: ObjectID(req.body._id)
    }
    log.info('dati grezzi: ' + JSON.stringify(req.body.dati));
    if (req.body.dati.indirizzo != "" && req.body.dati.indirizzo != null)  indirizzo = req.body.dati.indirizzo;
    if (req.body.dati.nome != "" && req.body.dati.nome != null) nome = req.body.dati.nome;
    if (req.body.dati.piva != "" && req.body.dati.piva != null)  piva = req.body.dati.piva;
   
    
    var fornitoremodificato = {
        nome: nome,
        indirizzo: indirizzo,
        piva: piva,
       
    }
    log.info('id: ' + JSON.stringify(query));
    log.info('dati fornitore: ' + JSON.stringify(fornitoremodificato));
    Fornitori.update(query, {
        $set: fornitoremodificato
    }, function (err) {
        if (err) log.info('non modificato'); // saved!
        else {
            res.status(201).json(fornitoremodificato);
        }
    });

}