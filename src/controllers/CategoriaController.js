const mongoose = require("mongoose");
const Categoria = mongoose.model("Categoria");

module.exports = {
    async index(req, res) { //listar
        //const { page = 1} = req.query;
       // const categoria = await Categoria.paginate({},{page, limit: 10});

        return res.json(categoria);
    },

    async show(req, res){ //filtrar
        const categoria = await Categoria.findById(req.params.id);
        return res.json(categoria);
    },

    async store(req, res){ // criar
        const categoria = await Categoria.create(req.body);

        return res.json(categoria);
    },

    async update(req, res){
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(categoria);
    },

    async destroy(req, res){
        await Categoria.findByIdAndRemove(req.params.id);

        return res.send();
    }
};