const express = require("express");
const routes = express.Router();

const UserController = require("../controllers/UserController");

routes.get("/list", UserController.index);

routes.post("/token", UserController.getUserByToken);

routes.post("/store", UserController.store);

routes.post("/auth/login", UserController.authenticate);
routes.post("/auth/token", UserController.authToken);

routes.post("/add/profession", UserController.addProfession);

module.exports = routes;
