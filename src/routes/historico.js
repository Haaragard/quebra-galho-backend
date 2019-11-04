const express = require('express');
const routes = express.Router();

const HistoricoController = require("../controllers/HistoricoController");

routes.get("/historicos", HistoricoController.index) ; 
routes.get("/historicos/:id", HistoricoController.show);
routes.post("/historicos", HistoricoController.store);
routes.put("/historicos/:id", HistoricoController.update);
routes.delete("/historicos/:id", HistoricoController.destroy);

module.exports = routes;