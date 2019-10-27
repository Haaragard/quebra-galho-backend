const mongoose = require("mongoose");

const Profession = mongoose.model("Profession");

module.exports = {
    async index(req, res) {
        const professions = await Profession.find();

        return res.json(professions);
    }
};
