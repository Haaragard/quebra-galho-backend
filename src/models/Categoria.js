const mongoose =  require("mongoose");

const CategoriaSchema = new mongoose.Schema({
    nome:{
        type: String,
    }
});

mongoose.model("Categoria", CategoriaSchema)