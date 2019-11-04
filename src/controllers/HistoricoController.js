const mongoose = require("mongoose");
const Historico = mongoose.model("Historico");

module.exports = {
    async index(req, res) { //listar
        const { page = 1} = req.query;
        const historico = await Historico.paginate({},{page, limit: 10});

        return res.json(historico);
    },

    async show(req, res){ //filtrar
        const historico = await Historico.findById(req.params.id);
        return res.json(historico);
    },

    async store(req, res){ // criar
        const historico = await Historico.create(req.body);

        return res.json(historico);
    },

    async update(req, res){
        const historico = await Historico.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(historico);
    },

    async destroy(req, res){
        await Historico.findByIdAndRemove(req.params.id);

        return res.send();
    }
};