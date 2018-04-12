var mongoose = require('mongoose');

var materieSchema = mongoose.Schema({

    nome: {
        type: String,
        required: true
    },
    icni: {
        type: String,
        required: true
    },
    confezione:{
        type:Number,
        required:true
    },   
    prezzo:{
        type:Number,
        required:true
    },
    fornitore: {
        type: String,
        required: true
    }
    
});

var Materieprime = module.exports = mongoose.model('Materieprime', materieSchema,'Materieprime');
