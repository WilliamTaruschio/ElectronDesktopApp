var mongoose = require('mongoose');

var prodottiSchema = mongoose.Schema({

    nome: {
        type: String,
        required: true
    },
   descrizione: {
        type: String,
        
    },
    prezzo:{
        type:Number,
        required:true
    },
    
});

var Prodotti = module.exports = mongoose.model('Prodotti', prodottiSchema,'Prodotti');
