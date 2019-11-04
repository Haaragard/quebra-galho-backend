const moongoose = require("mongoose");

const ImageSchema = new moongoose.Schema({
    name: String,
    size: Number,
    key: String,
    createdAt:{
        type: Date,
        default: Date.now,
    },
    usuario: {
        type: String, 
      //  ref: "User"
    },
    servico: {
        type: String, 
       // ref: "User"
    }
});

module.exports = moongoose.model("Image", ImageSchema);