const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
            await User.findOne({ email })
                .select("+senha")
                .exec(function(err, user) {
                    if (!user || err) {
                        return res
                            .status(400)
                            .send({ error: "User not found." });
                    }

                    user.comparePassword(senha, function(err, isMatch) {
                        if (err) throw err;
                        if (isMatch) {
                            jwt.sign(
                                { user: user._id },
                                process.env.JWT_SECRET,
                                function(err, token) {
                                    if (err) {
                                        res.status(400).send({
                                            error: "Can't generate user token."
                                        });
                                    }
                                    return res.send({
                                        auth: isMatch,
                                        token
                                    });
                                }
                            );
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
                if (err) res.status(400).send({ error: "Can't decode token." });
                if (decoded) res.send({ auth: true });
            });
        } catch (error) {
            res.status(400).send({ error: "This is not a valid token." });
        }
    },

    async getUserByToken(req, res) {
        const { token } = req.body;

        try {
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                if (err) res.status(400).send({ error: "Can't decode token." });
                if (decoded) {
                    User.findOne({ _id: decoded.user }).exec(function(
                        err,
                        user
                    ) {
                        if (err)
                            res.status(400).send({
                                error: "This is not a valid token."
                            });
                        res.send({ auth: true, user: user });
                    });
                }
            });
        } catch (error) {
            res.status(400).send({ error: "This is not a valid token." });
        }
    }
};
