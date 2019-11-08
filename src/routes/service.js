const express = require("express");
const routes = express.Router();

const ServiceController = require("../controllers/ServiceController");

routes.get("/list", ServiceController.index);
routes.post("/store", ServiceController.store);

routes.post("/list/total", ServiceController.totalList);
routes.post("/list", ServiceController.list);

routes.post("/list/mostAccess", ServiceController.listMostAccess);
routes.post("/list/geoLocation", ServiceController.listGeoLocation);

module.exports = routes;
