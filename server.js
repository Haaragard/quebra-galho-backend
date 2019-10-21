const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

// Iniciando o App
const app = express();
app.use(express.json());

//Iniciando o DB
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/quebragalho", {
    useNewUrlParser: true
});

requireDir("./src/models");

//Rotas
app.use("/quebragalho", require("./src/routes"));

app.listen(3001);
