const express = require("express");
const routes = express.Router();

const ProfessionController = require("../controllers/ProfessionController");

routes.get("/list", ProfessionController.index);
routes.post("/store", ProfessionController.store);

module.exports = routes;
