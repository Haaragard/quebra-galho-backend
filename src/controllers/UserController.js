const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = {
	async index(req, res) {
		const users = await User.find();

		return res.json(users);
	},

	async store(req, res) {
		const { email, cpf } = req.body;
		try {
			if (
				(await User.findOne({ email })) ||
				(await User.findOne({ cpf }))
			) {
				return res.status(400).send({ error: "User already exists." });
			}

			const user = await User.create(req.body);

			user.senha = undefined;

			return res.json(user);
		} catch (error) {
			return res.status(400).send({ error: "Registration failed." });
		}
	},

	async authenticate(req, res) {
		const { email, senha } = req.body;
		try {
			const user = await User.findOne({ email })
				.select("+senha")
				.exec(function(err, user) {
					if (!user || err) {
						return res
							.status(400)
							.send({ error: "Usuário não encontrado." });
					}

					user.comparePassword(senha, function(err, isMatch) {
						if (err) throw err;
						if (isMatch) {
						}
						return res.send({
							usuario: isMatch,
						});
					});
				});
		} catch (error) {
			return res.status(400).send({ msg: "Login error." });
		}
	},
};
