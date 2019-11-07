require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

// Iniciando o App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Iniciando o DB
mongoose.set("useUnifiedTopology", true);
mongoose.set("createIndexes", true);
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
});

requireDir("./src/models");

//Rotas
app.use(require("./src/routes"));

app.listen(process.env.PORT || 3001);
