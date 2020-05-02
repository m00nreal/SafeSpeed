const Registro = require('../models/register');
const user = require('../models/user');
const fileEncoder = require('../helpers/fileEncoder');
const registerCtrl = {};

registerCtrl.getRegisters = async (req,res) => {
    var userId = req.userId;
    console.log(userId);
    user.findById(userId)
        .then((result) => {
            var key = result.key;
            Registro.find({key : key})
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.json({"status" : "error"});
            })
        })
        .catch((err) => {
            res.json({
                'status' : 'error'
            });
        });
}

registerCtrl.getRegister = async (req,res) => {
    var reg = await Registro.findById(req.params.id);
    req.json(reg);
}

registerCtrl.createRegister = async (req,res) => {
    //create Image
    var {image} = req.body;
    delete req.body.image;
    fileEncoder.base64_decode(image, req.body.imageName);
    var reg = new Registro(req.body);
    reg.save()
        .then(() => {
            res.json({"status" : "correcto"})
        })
        .catch((err) => {
            res.json({"status" : "error"})
        });
}

registerCtrl.deleteRegister = async (req,res) => {
    Registro.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({"satus" : "correcto"});
        })
        .catch((err) => {
            res.json({"status" : "error"});
        });
}

registerCtrl.editRegister = async (req,res) => {
    var {id} = req.params;
    var reg = {
        key: req.params.key,
        plates: req.params.plates
    };
    Registro.findByIdAndUpdate(id, {$set : reg}, {new: true})
        .then(()=>{
            res.json({"status" : "Registro actualizado."});
        })
        .catch((err) => {
            res.json({"status" : "error"});
        });
}

module.exports = registerCtrl;