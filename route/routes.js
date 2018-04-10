module.exports = function (app, db, req) {
    var mongoose = require('mongoose');
    var Prodotti = require('../models/Prodotti.js');
    var log = require('electron-log');
    var ObjectID = require("mongodb").ObjectID;
    var db;
    var api = require('../API/api.js');
    api.setDb(db);

    log.info(db);
    app.route('/getprodotti')
        .get(api.listaprodotti);
    app.route('/aggiungiprodotto')
        .post(api.aggiungiprodotto);
    app.route('/eliminaprodotto/:id')
        .delete(api.eliminaprodotto);
    app.route('/modificaprodotto')
        .put(api.modificaprodotto);
};