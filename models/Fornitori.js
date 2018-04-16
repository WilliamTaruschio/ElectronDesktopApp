var mongoose = require('mongoose');

var fornitoriSchema = mongoose.Schema({

    nome: {
        type: String,
        required: true
    },
    indirizzo: {
        type: String,
        required: true
    },
    piva: {
        type: String,
        required: true
    },


});

var Fornitori = module.exports = mongoose.model('Fornitori', fornitoriSchema, 'Fornitori');