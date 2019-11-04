const mongoose =  require("mongoose");

const HistoricoSchema = new mongoose.Schema({
    servico:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Servico"
    },
    agenda:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Agenda"
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
});

mongoose.model("Historico", HistoricoSchema);