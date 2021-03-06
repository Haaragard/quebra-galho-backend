const express = require("express");
const multer = require("multer");
const multerConfig = require("../config/multer");

const routes = express.Router();

const ServiceController = require("../controllers/ServiceController");

routes.get("/list", ServiceController.index);

routes.post("/getById", ServiceController.findById);

routes.post(
	"/store",
	multer(multerConfig.MulterConfigServiceFotos).any(),
	ServiceController.store,
);

routes.post("/list/total", ServiceController.totalList);
routes.post("/list", ServiceController.list);
routes.post("/list/mostAccess", ServiceController.listMostAccess);
routes.post("/list/geoLocation", ServiceController.listGeoLocation);

routes.post("/accesses/plus", ServiceController.countAccessUp);

module.exports = routes;
