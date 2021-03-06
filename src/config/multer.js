const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const MulterConfigAvatar = {
	dest: path.resolve(__dirname, "..", "..", "images", "user", "avatar"),
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.resolve(__dirname, "..", "..", "images", "user", "avatar"));
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err);

				const fileName = `${hash.toString("hex")}-${file.originalname}`;

				cb(null, fileName);
			});
		},
	}),
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error("Invalid file type."));
		}
	},
};

const MulterConfigServiceFotos = {
	dest: path.resolve(__dirname, "..", "..", "images", "service"),
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.resolve(__dirname, "..", "..", "images", "service"));
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err);

				const fileName = `${hash.toString("hex")}-${file.originalname}`;

				cb(null, fileName);
			});
		},
	}),
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error("Invalid file type."));
		}
	},
};

module.exports = {
	MulterConfigAvatar,
	MulterConfigServiceFotos,
};
