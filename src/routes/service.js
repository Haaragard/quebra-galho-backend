const express = require("express");
const routes = express.Router();

const ServiceController = require("../controllers/ServiceController");

routes.get("/list", ServiceController.index);
routes.post("/store", ServiceController.store);

module.exports = routes;
