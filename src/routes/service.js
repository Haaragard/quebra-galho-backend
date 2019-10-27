const express = require("express");
const routes = express.Router();

const ServiceController = require("../controllers/ServiceController");

routes.get("/list", ServiceController.index);
// routes.get("/list/page", ServiceController.listWithPage);
// routes.get("/list/user", ServiceController.listByUser);

// routes.post("/store", ServiceController.store);

module.exports = routes;
