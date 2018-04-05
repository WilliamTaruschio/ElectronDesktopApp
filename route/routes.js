module.exports = function (app, db) {
    var api = require('../API/api.js');
    api.setDb(db);

    // Api frontend
    app.route('/aggiungiprodotto')
        .post(api.aggiungiprodotto);
    app.route('/getprodotti')
        .get(api.listaprodotti);





};