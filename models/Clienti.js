var mongoose = require('mongoose');

var clientiSchema = mongoose.Schema({
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
    sconto: {
        type: Number,
        required: true
    }


});

var Clienti = module.exports = mongoose.model('Clienti', clientiSchema, 'Clienti');