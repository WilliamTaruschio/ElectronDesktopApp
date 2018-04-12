module.exports = function (app, db, req) {
    var mongoose = require('mongoose');
    var Materie = require('../models/Materieprime.js');
    var log = require('electron-log');
    var ObjectID = require("mongodb").ObjectID;
    var db;
    var api = require('../API/apiMaterie.js');
    api.setDb(db);

    log.info(db);
    app.route('/getmaterie')
        .get(api.listamaterie);
    app.route('/aggiungimateria')
        .post(api.aggiungimateria);
    app.route('/eliminamateria/:id')
        .delete(api.eliminamateria);
    app.route('/modificamateria')
        .put(api.modificamateria);

};