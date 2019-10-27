const mongoose = require("mongoose");

const Service = mongoose.model("Service");

module.exports = {
    async index(req, res) {
        const services = await Service.find();

        return res.json(services);
    }
};
