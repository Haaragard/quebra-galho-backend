const mongoose = require("mongoose");
const fs = require("fs");

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
		const user = JSON.parse(req.body.user);
		const service = JSON.parse(req.body.service);

		try {
			if (
				await Service.findOne({
					_userId: mongoose.Types.ObjectId(user._id),
					nome: service.nome,
				})
			) {
				req.files.map(async (value, index) => {
					let imageToDelete = `./images/service/${value.filename}`;
					await fs.access(imageToDelete, error => {
						fs.unlink(imageToDelete, function(error) {});
					});
				});
				return res.status(400).send({ error: "Service already exists." });
			}

			if (!service._id) service._id = undefined;

			req.files.map((value, index) => {
				if (!service.fotos[0]) service.fotos.shift();
				if (value.fieldname === "files[]") {
					service.fotos.push(value.filename);
				} else if (value.fieldname === "imagePrincipal") {
					service.fotoPrincipal = value.filename;
				}
			});

			service._userId = mongoose.Types.ObjectId(user._id);

			await Service.create(service);

			return res.send({ msg: "Registered successfully." });
		} catch (error) {
			req.files.map(async (value, index) => {
				let imageToDelete = `./images/service/${value.filename}`;
				await fs.access(imageToDelete, error => {
					fs.unlink(imageToDelete, function(error) {});
				});
			});
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
		const { service, list, count } = req.body;

		if (count) {
			await Service.count(service).exec(function(err, total) {
				if (err)
					res.status(400).send({
						error: "Can't count total of this list.",
					});

				res.send({ total: total });
			});
		} else {
			await Service.find(service)
				.limit(list.limit)
				.skip(list.limit * list.page)
				.exec(function(err, services) {
					if (err) res.status(400).send({ error: "Can't list services." });

					res.send({ services: services });
				});
		}
	},

	async listMostAccess(req, res) {
		const { service, list } = req.body;

		if (count) {
			await Service.count(service).exec(function(err, total) {
				if (err)
					res.status(400).send({
						error: "Can't count total of this list.",
					});

				res.send({ total: total });
			});
		} else {
			await Service.find(service)
				.limit(list.limit)
				.skip(list.limit * list.page)
				.exec(function(err, services) {
					if (err) res.status(400).send({ error: "Can't list services." });

					res.send({ services: services });
				});
		}
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
