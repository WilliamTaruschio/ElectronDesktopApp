module.exports = function (app, db, req) {
    var mongoose = require('mongoose');
    var Clienti = require('../models/Clienti.js');
    var log = require('electron-log');
    var ObjectID = require("mongodb").ObjectID;
    var db;
    var api = require('../API/apiClienti.js');
    api.setDb(db);

    log.info(db);
    app.route('/getclienti')
        .get(api.listaclienti);
    app.route('/aggiungicliente')
        .post(api.aggiungicliente);
    app.route('/eliminacliente/:id')
        .delete(api.eliminacliente);
    app.route('/modificacliente')
        .put(api.modificacliente);

};