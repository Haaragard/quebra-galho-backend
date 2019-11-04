const express = require('express');
const routes = express.Router();

const ServicoController = require('./controllers/ServicoController');

routes.get("/servicos", ServicoController.index) ; 
routes.get("/servicos/:id", ServicoController.show);
routes.post("/servicos", ServicoController.store);
routes.put("/servicos/:id", ServicoController.update);
routes.delete("/servicos/:id", ServicoController.destroy);

routes.post("/servicos/categorias", ServicoController.filtroCategoria);
routes.post("/servicos/valores", ServicoController.filtrarValor);

module.exports = routes;