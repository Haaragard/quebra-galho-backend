const mongoose = require("mongoose");
const Agenda = mongoose.model("Agenda");

module.exports = {
    async index(req, res) { //listar
        const { page = 1} = req.query;
        const agenda = await Agenda.paginate({},{page, limit: 10});

        return res.json(agenda);
    },

    async show(req, res){ //filtrar
        const agenda = await Agenda.findById(req.params.id);
        return res.json(agenda);
    },

    async store(req, res){ // criar
        const agenda = await Agenda.create(req.body);

        return res.json(agenda);
    },

    async update(req, res){
        const agenda = await Agenda.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(agenda);
    },

    async destroy(req, res){
        await Agenda.findByIdAndRemove(req.params.id);

        return res.send();
    }
};