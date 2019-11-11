const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	cpf: {
		type: String,
		required: true,
		index: { unique: true },
	},
	nome: {
		type: String,
		required: true,
	},
	sobrenome: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		index: { unique: true },
	},
	dataNascimento: {
		type: Date,
		required: true,
	},
	senha: {
		type: String,
		required: true,
		select: false,
	},
	avatar: {
		type: String,
		required: false,
	},
	profissao: [
		{
			nome: {
				type: String,
				required: true,
			},
		},
	],
	latitude: {
		type: String,
	},
	longitude: {
		type: String,
	},
	pais: {
		type: String,
		default: String("Brasil"),
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.pre("save", async function(next) {
	const hash = await bcrypt.hash(this.senha, 10);
	this.senha = hash;

	next();
});

UserSchema.methods = {
	comparePassword: function(candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.senha, function(err, isMatch) {
			if (err) return cb(err);
			cb(null, isMatch);
		});
	},
};

mongoose.model("User", UserSchema);
