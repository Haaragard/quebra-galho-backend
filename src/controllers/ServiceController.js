const mongoose = require("mongoose");

const Service = mongoose.model("Service");

module.exports = {
	async index(req, res) {
		const services = await Service.find();

		return res.json(services);
	},

	async store(req, res) {
		const { user, service } = req.body;
		try {
			if (await Service.findOne({ _userId: user._id, nome: service.nome })) {
				return res.status(400).send({ error: "Service already exists." });
			}

			service._userId = user._id;

			let newService = await Service.create(service);

			return res.send(newService);
		} catch (error) {
			return res.status(400).send({ error: "Registration failed." });
		}
	},
};
