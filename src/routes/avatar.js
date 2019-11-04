const multer = require("multer");
const multerConfig = require("../config/multer");

const Image = require("./models/Image");

routes.post("/image", multer(multerConfig).single("file") , async(req, res)=>{
    
    const {originalname: name, size, filename: key} = req.file;
    
    const image = await Image.create({
       name,
       size,
       key,
       id_usuario: '',
       id_servico: '',
    })
    return res.json({image});
});

module.exports = routes;