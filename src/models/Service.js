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
	location: {
		type: { type: String, default: String("Point") },
		coordinates: { type: [Number] },
	},
	valor: {
		type: String,
		default: "R$0",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

ServiceSchema.index({ location: "2dsphere" });

mongoose.model("Service", ServiceSchema);
