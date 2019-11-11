const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
	_userId: {
		type: mongoose.ObjectId,
		required: true,
		index: true,
	},
	nome: {
		type: String,
		required: true,
	},
	descricao: {
		type: String,
		required: false,
	},
	fotoPrincipal: {
		type: String,
	},
	fotos: [String],
	acessos: {
		type: Number,
		default: Number(0),
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

mongoose.model("Service", ServiceSchema);
