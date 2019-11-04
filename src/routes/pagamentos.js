const express = require("express");
const routes = express.Router();

const PagamentoController = require("../controllers/PagamentoController");

routes.get("/pagamentos", PagamentoController.index) ;
routes.get("/pagamentos/:id", PagamentoController.show);
routes.post("/pagamentos", PagamentoController.store);
routes.put("/pagamentos/:id", PagamentoController.update);
routes.delete("/pagamentos/:id", PagamentoController.destroy);

module.exports = routes;