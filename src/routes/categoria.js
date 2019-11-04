const express = require("express");
const routes = express.Router();

const CategoriaController = require("../controllers/CategoriaController");

routes.get("/categorias", CategoriaController.index);
routes.get("/categoria/:id", CategoriaController.show);
routes.post("/categorias", CategoriaController.store);