const mongoose = require("mongoose");

const ServicoSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true,
    },
    foto:{
        type: String,
    },
    descricao:{
        type: String,
        required: true,
    },
    valor:{
        type: Number,
        required: true,
    },
    vizualizacao:{
        type: Number
    },
    longitude:{
        type:Number
    },
    latidude:{
        type:Number
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Categoria"
     },
    usuario:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
});

mongoose.model("Servico", ServicoSchema);
