module.exports = function (app, db, req) {
    var mongoose = require('mongoose');
    var Fornitori = require('../models/Fornitori.js');
    var log = require('electron-log');
    var ObjectID = require("mongodb").ObjectID;
    var db;
    var api = require('../API/apiFornitori.js');
    api.setDb(db);

    log.info(db);
    app.route('/getfornitori')
        .get(api.listafornitori);
    app.route('/aggiungifornitore')
        .post(api.aggiungifornitore);
    app.route('/eliminafornitore/:id')
        .delete(api.eliminafornitore);
    app.route('/modificafornitore')
        .put(api.modificafornitore);

};