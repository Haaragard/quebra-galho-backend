const mongoose =  require("mongoose");

const PagamentoSchema = new mongoose.Schema({
    confirmacao:{
        type: Boolean,
        required: true,
    },
    agenda:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Agenda"
    },
});

mongoose.model("Pagamento", PagamentoSchema);