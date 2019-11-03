const express = require("express");
const routes = express.Router();

//Users
routes.use("/user", require("./routes/user"));

//Professions
routes.use("/profession", require("./routes/profession"));

//Services
routes.use("/service", require("./routes/service"));

//Services
routes.use("/hiredService", require("./routes/hiredService"));
module.exports = routes;
