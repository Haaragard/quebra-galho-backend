const mongoose = require("mongoose");
const Servico = mongoose.model("Servico");

module.exports = {
    async index(req, res) { //listar
        const { page = 1} = req.query;
        const servico = await Servico.paginate({},{page, limit: 10});

        return res.json(servico);
    },

    async show(req, res){ 
        const servico = await Servico.findById(req.params.id);
        return res.json(servico);
    },

     async filtrarValor(req, res){ //Filtrar valor
        Servico.find({valor:req.query.valor}).then((result) => {
            return res.json(result)
       }, (err) => {
            return res.status(500).json({error: err})
       })

    //    if(!result)
    //    return res.status(400).send({error: 'Não há serviços com este valor'});
      },

    async filtroCategoria(req, res){ //Filtrar por Categoria
        Servico.find({categoria:req.query.categoria}).then((result) => {
            return res.json(result)
       }, (err) => {
            return res.status(500).json({error: err})
       })
    },
  
    async store(req, res){ // criar
        const servico = await Servico.create(req.body);

        return res.json(servico);
    },

    async update(req, res){
        const servico = await Servico.findByIdAndUpdate(req.params.id, req.body, {new:true});

        return res.json(servico);
    },

    async destroy(req, res){
        await Servico.findByIdAndRemove(req.params.id);

        return res.send();
    }
};
