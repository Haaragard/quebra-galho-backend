const mongoose = require("mongoose");

const HiredServiceSchema = new mongoose.Schema({
	_userId: {
		type: mongoose.ObjectId,
		required: true,
		index: true,
	},
	_serviceId: {
		type: mongoose.ObjectId,
		required: true,
		index: true,
	},
	location: {
		type: { type: String },
		coordinates: [Number],
	},
	dataMarcada: {
		type: Date,
	},
	statusExecucao: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

mongoose.model("HiredService", HiredServiceSchema);
