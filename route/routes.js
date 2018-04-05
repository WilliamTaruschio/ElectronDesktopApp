module.exports = function (app, db) {
        var api = require('../API/api.js');
        api.setDb(db);

        // Api frontend
        app.route('/aggiungiprodotto')
            .post(api.aggiungiprodotto);

        app.route('#/getprodotti')
            .get(function (req, res) {
                    log.info("GET prodotti");
                    Prodotti.find().then(function (docs) {

                       
                        res.status(200).json(docs[0]);

                    })
                
                });





            };