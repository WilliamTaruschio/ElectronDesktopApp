module.exports = function (app, db, req) {
    var mongoose = require('mongoose');
    var Acquisto = require('../models/Acquisto.js');
    var log = require('electron-log');
    var ObjectID = require("mongodb").ObjectID;
    var db;
    var api = require('../API/apiFattureacquisto.js');
    api.setDb(db);

    log.info(db);
    app.route('/getfattureacquisto')
        .get(api.listafatture);
    app.route('/aggiungifattura')
        .post(api.aggiungifattura);
    app.route('/eliminafattura/:id')
        .delete(api.eliminafattura);
    app.route('/modificafattura')
        .put(api.modificafattura);

};