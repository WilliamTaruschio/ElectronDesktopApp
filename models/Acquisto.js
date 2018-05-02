var mongoose = require('mongoose');

var acquistoSchema = mongoose.Schema({
    data: {
        type: Date,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    file:{
        type:String
    }


});

var Acquisto = module.exports = mongoose.model('Acquisto', acquistoSchema, 'FattureAcquisto');