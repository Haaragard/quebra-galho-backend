const express = require("express");
const routes = express.Router();

//Usuarios
routes.use(require("./routes/user"));

module.exports = routes;
