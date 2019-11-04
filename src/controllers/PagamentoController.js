const mongoose = require("mongoose");
const Pagamento = mongoose.model("Pagamento");

module.exports = {
    async index(req, res) { //listar
        const { page = 1} = req.query;
        const pagamento = await Pagamento.paginate({},{page, limit: 10});

        return res.json(pagamento);
    },

    async show(req, res){ //filtrar
        const pagamento = await Pagamento.findById(req.params.id);
        return res.json(pagamento);
    },

    async store(req, res){ // criar
        const pagamento = await Pagamento.create(req.body);

        return res.json(pagamento);
    },

    async update(req, res){
        const pagamento = await Pagamento.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(pagamento);
    },

    async destroy(req, res){
        await Pagamento.findByIdAndRemove(req.params.id);

        return res.send();
    }
};