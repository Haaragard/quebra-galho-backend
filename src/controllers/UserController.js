const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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
			return res.status(400).send({ error: "Login error." });
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
						if (user) user._id = decoded.user;
						return res.send({ auth: user ? true : false, user: user });
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
		const { filename } = req.file;
		const user = JSON.parse(req.body.user);
		try {
			await User.updateOne(
				{ _id: mongoose.Types.ObjectId(user._id) },
				{ avatar: filename },
				async function(err, result) {
					if (err)
						return res
							.status(400)
							.send({ error: "Ocurred a error while updating avatar." });

					if (user.avatar) {
						user.avatar = `./images/user/avatar/${user.avatar}`;
						await fs.access(user.avatar, error => {
							fs.unlink(user.avatar, function(error) {});
						});
					}

					await User.findById(user._id, function(err, user) {
						if (err)
							return res
								.status(400)
								.send({ error: "Ocurred a error while updating avatar." });
						return res.send({ user: user });
					});
				},
			);
		} catch (error) {
			return res.status(400).send({ error: "Couldn't update user avatar." });
		}
	},

	async updateLocation(req, res) {
		const user = JSON.parse(req.body.user);
		try {
			await User.updateOne(
				{ _id: mongoose.Types.ObjectId(user._id) },
				{ location: user.location },
				function(err, result) {
					if (err)
						return res
							.status(400)
							.send({ error: "Ocurred a error while updating user location." });

					return res.send({ msg: "User location updated with success." });
				},
			);
		} catch (error) {
			return res.status(400).send({ error: "Couldn't update user avatar." });
		}
	},

	async findById(req, res) {
		const { user } = req.body;

		try {
			await User.findById(user._id, function(err, user) {
				if (err)
					return res.status(400).send({ error: "Couldn't find this user." });

				res.send({ user });
			});
		} catch (error) {
			return res
				.status(400)
				.send({ error: "Ocurred an error while searching for user." });
		}
	},
};
