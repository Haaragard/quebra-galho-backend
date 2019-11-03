const express = require("express");
const routes = express.Router();

const HiredServiceController = require("../controllers/HiredServiceController");

routes.get("/list", HiredServiceController.index);
routes.post("/store", HiredServiceController.store);

module.exports = routes;
