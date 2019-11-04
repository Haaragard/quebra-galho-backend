require("dotenv/config");

const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

// Iniciando o App
const app = express();
app.use(express.json());

//Iniciando o DB
//mongoose.set("useUnifiedTopology", true);
//mongoose.set("createIndexes", true);
mongoose.connect('mongodb://localhost:27017/QuebraGalhoApi', {
	useNewUrlParser: true,
});

requireDir("./src/models");

//Rotas
app.use(require("./src/routes"));

app.listen(process.env.PORT || 3001);
