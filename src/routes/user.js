const express = require("express");
const routes = express.Router();

const UserController = require("../controllers/UserController");

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);

routes.post("/user/token", UserController.getUserByToken);

routes.post("/users", UserController.store);

routes.post("/auth/login", UserController.authenticate);
routes.post("/auth/token", UserController.authToken);

routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

module.exports = routes;
