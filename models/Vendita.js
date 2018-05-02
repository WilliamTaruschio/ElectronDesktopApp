var mongoose = require('mongoose');

var venditaSchema = mongoose.Schema({
    data: {
        type: Date,
        required: true
    },
    nome: {
        type: String,
        required: true
    },


});

var Vendita = module.exports = mongoose.model('Vendita', venditaSchema, 'FattureVendita');