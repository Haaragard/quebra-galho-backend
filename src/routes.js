const express = require("express");
const routes = express.Router();

//Usuarios
routes.use(require("./routes/user"));

routes.use(require("./routes/categoria"));
routes.use(require("./routes/servico"));
routes.use(require("./routes/agenda"));
vroutes.use(require("./routes/pagamento"));
routes.use(require("./routes/historico"));

module.exports = routes;
