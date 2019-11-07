const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");
const Profession = mongoose.model("Profession");

module.exports = {
	async index(req, res) {
		const users = await User.find();

		return res.json(users);
	},

	async store(req, res) {
		const { email, cpf } = req.body;
		try {
			if ((await User.findOne({ email })) || (await User.findOne({ cpf }))) {
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
			await User.findOne({ email })
				.select("+senha")
				.exec(function(err, user) {
					if (!user || err) {
						return res.status(400).send({ error: "User not found." });
					}

					user.comparePassword(senha, function(err, isMatch) {
						if (err) throw err;
						if (isMatch) {
							jwt.sign({ user: user._id }, process.env.JWT_SECRET, function(
								err,
								token,
							) {
								if (err) {
									return res.status(400).send({
										error: "Can't generate user token.",
									});
								}
								return res.send({
									auth: isMatch,
									token,
								});
							});
						}
					});
				});
		} catch (error) {
			return res.status(400).send({ msg: "Login error." });
		}
	},

	async authToken(req, res) {
		const { token } = req.body;

		try {
			jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
				if (err) return res.status(400).send({ error: "Can't decode token." });
				if (decoded) return res.send({ auth: true });
			});
		} catch (error) {
			return res.status(400).send({ error: "This is not a valid token." });
		}
	},

	async getUserByToken(req, res) {
		const { token } = req.body;

		try {
			jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
				if (err) return res.status(400).send({ error: "Can't decode token." });
				if (decoded) {
					User.findOne({ _id: decoded.user }).exec(function(err, user) {
						if (err)
							return res.status(400).send({
								error: "This is not a valid token.",
							});
						return res.send({ auth: true, user: user });
					});
				}
			});
		} catch (error) {
			return res.status(400).send({ error: "This is not a valid token." });
		}
	},

	async addProfession(req, res) {
		const { user, profession } = req.body;
		try {
			await User.findById(user._id, async function(err, user) {
				if (err) return res.status(400).send({ error: "Couldn't find user." });
				if (user.profissao) {
					user.profissao.map(profissao => {
						if (profissao._id === profession._id)
							return res
								.status(400)
								.send({ error: "User already has this profession." });
					});
				}

				await Profession.findById(profession._id, async function(
					err,
					profissao,
				) {
					if (err)
						return res
							.status(400)
							.send({ error: "Profession doesn't exists." });

					user.profissao.push(profissao);
					await user.updateOne({ profissao: user.profissao }, function(
						err,
						raw,
					) {
						if (err)
							return res.status(400).send({ error: "Couldn't alter user." });

						return res.send({ msg: "Profession added." });
					});
				});
			});
		} catch (error) {
			return res.status(400).send({ error: "Couldn't add a profession." });
		}
	},

	async addService(req, res) {
		const { data } = req.body;
	},

	async updateAvatar(req, res) {
		return res.status(400).send({ error: req.file });

		const { user } = req.body;
		const avatar = req.file.filename;

		try {
			await User.findByIdAndUpdate(user._id, { avatar: avatar }, function(
				err,
				user,
			) {
				if (err || !user)
					return res
						.status(400)
						.send({ error: "Ocurred a error while updating avatar." });
				return res.send({ user });
			});
		} catch (error) {
			return res.status(400).send({ error: "Couldn't update user avatar." });
		}
	},
};
