const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    idContratante: {
        type: String,
        required: true
    },
    idContratado: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    }
});

mongoose.model("Service", ServiceSchema);
