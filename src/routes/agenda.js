const express = require("express");
const routes = express.Router();

const AgendaController = require("../controllers/AgendaController");

routes.get("/agendas", AgendaController.index) ; // req = requiseições res = resposta
routes.get("/agendas/:id", AgendaController.show);
routes.post("/agendas", AgendaController.store);
routes.put("/agendas/:id", AgendaController.update);
routes.delete("/agendas/:id", AgendaController.destroy);

module.exports = routes;