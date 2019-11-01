const express = require("express");
const routes = express.Router();

const ProfessionController = require("../controllers/ProfessionController");

routes.get("/list", ProfessionController.index);
// routes.get("/list/page", ProfessionController.listWithPage);
// routes.get("/list/user", ProfessionController.listByUser);

routes.post("/store", ProfessionController.store);

module.exports = routes;
