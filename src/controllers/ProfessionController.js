const mongoose = require("mongoose");

const Profession = mongoose.model("Profession");

module.exports = {
	async index(req, res) {
		const professions = await Profession.find();

		return res.json(professions);
	},

	async store(req, res) {
		const { profession } = req.body;
		try {
			if (await Profession.findOne({ nome: profession.nome })) {
				return res.status(400).send({ error: "Profession already exists." });
			}

			let newProf = await Profession.create(profession);

			return res.send(newProf);
		} catch (error) {
			return res.status(400).send({ error: "Registration failed." });
		}
	},
};
