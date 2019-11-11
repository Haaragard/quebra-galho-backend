const mongoose = require("mongoose");

const Service = mongoose.model("Service");

module.exports = {
	async index(req, res) {
		const services = await Service.find();

		return res.json(services);
	},

	async findById(req, res) {
		const { service } = req.body;

		try {
			await Service.findById(service._id, function(err, service) {
				if (err)
					return res.status(400).send({ error: "Couldn't find this service." });

				res.send({ service });
			});
		} catch (error) {
			return res
				.status(400)
				.send({ error: "Ocurred an error while searching for service." });
		}
	},

	async store(req, res) {
		const { user, service } = req.body;
		try {
			if (
				await Service.findOne({
					_userId: mongoose.Types.ObjectId(user._id),
					nome: service.nome,
				})
			) {
				return res.status(400).send({ error: "Service already exists." });
			}

			service._userId = mongoose.Types.ObjectId(user._id);

			let newService = await Service.create(service);

			return res.send(newService);
		} catch (error) {
			return res.status(400).send({ error: "Registration failed." });
		}
	},

	async totalList(req, res) {
		const { service } = req.body;

		await Service.count(service).exec(function(err, total) {
			if (err)
				res.status(400).send({
					error: "Can't count total of this list.",
				});

			res.send({ total: total });
		});
	},

	async list(req, res) {
		const { service, list } = req.body;

		await Service.find(service)
			.limit(list.limit)
			.skip(list.limit * list.page)
			.exec(function(err, services) {
				if (err) res.status(400).send({ error: "Can't list services." });

				res.send({ services: services });
			});
	},

	async listMostAccess(req, res) {
		const { service, list } = req.body;

		await Service.find(service)
			.limit(list.limit)
			.skip(list.limit * list.page)
			.exec(function(err, services) {
				if (err) res.status(400).send({ error: "Can't list services." });

				res.send({ services: services });
			});
	},

	async listGeoLocation(req, res) {
		const { service, list } = req.body;

		res.send("not implemented");

		await Service.find(service)
			.limit(list.limit)
			.skip(list.limit * list.page)
			.exec(function(err, services) {
				if (err) res.status(400).send({ error: "Can't list services." });

				res.send({ services: services });
			});
	},
};
