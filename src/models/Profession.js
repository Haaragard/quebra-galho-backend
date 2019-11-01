const mongoose = require("mongoose");

const ProfessionSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: true,
		unique: true,
	},
});

mongoose.model("Profession", ProfessionSchema);
