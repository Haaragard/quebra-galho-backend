const express = require("express");
const routes = express.Router();

//User Avatars
routes.use(
	"/images/user/avatar",
	express.static(__dirname + "/../images/user/avatar/"),
);

//User Avatars
routes.use("/images/service", express.static(__dirname + "/../images/service"));

//Users
routes.use("/user", require("./routes/user"));

//Professions
routes.use("/profession", require("./routes/profession"));

//Services
routes.use("/service", require("./routes/service"));

//Hired Services
routes.use("/hiredService", require("./routes/hiredService"));
module.exports = routes;
