const mongoose =  require("mongoose");

const AgendaSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true,
    },
    horario:{
        type: Date,
        required: true,
    },
    cidade:{
        type: String,
        required: true,
    },
    bairro:{
        type: String,
        required: true,
    },
    nCasa:{
        type: Number,
        required: true,
    },
    realizado:{
        type: Boolean,
        required: true,
    },
    pago:{
        type: Boolean,
        required: true,
    },
    servico:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Servico"
    },
    Usuario:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
});

mongoose.model("Agenda", AgendaSchema);