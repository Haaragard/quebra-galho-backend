const mongoose = require("mongoose");

const HiredService = mongoose.model("HiredService");
const User = mongoose.model("User");
const Service = mongoose.model("Service");

module.exports = {
	async index(req, res) {
		const hiredServices = await HiredService.find();

		return res.json(hiredServices);
	},

	async store(req, res) {
		const { user, service } = req.body;

		try {
			await User.findById(user._id, function(err, user) {
				if (err) return res.status(400).send({ error: "User doesn't exists." });
			});
			await Service.findById(service._id, function(err, service) {
				if (err)
					return res.status(400).send({ error: "Service doesn't exists." });
			});
			let hiredService = {
				_userId: mongoose.Types.ObjectId(user._id),
				_serviceId: mongoose.Types.ObjectId(service._id),
			};

			let newHiredService = await HiredService.create(hiredService);

			return res.send(newHiredService);
		} catch (error) {
			return res.status(400).send({ error: "Registration failed." });
		}
	},
};
