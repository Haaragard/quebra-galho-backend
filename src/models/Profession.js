const mongoose = require("mongoose");

const ProfessionSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }
});

mongoose.model("Profession", ProfessionSchema);
