const express = require("express");
const multer = require("multer");
const multerConfig = require("../config/multer");

const routes = express.Router();

const UserController = require("../controllers/UserController");

routes.get("/list", UserController.index);

routes.post("/getById", UserController.findById);

routes.post("/token", UserController.getUserByToken);

routes.post("/store", UserController.store);

routes.post("/auth/login", UserController.authenticate);
routes.post("/auth/token", UserController.authToken);

routes.post("/add/profession", UserController.addProfession);

routes.post("/update/location", UserController.updateLocation);

routes.post(
	"/avatar/upload",
	multer(multerConfig.MulterConfigAvatar).single("file"),
	UserController.updateAvatar,
);

module.exports = routes;
