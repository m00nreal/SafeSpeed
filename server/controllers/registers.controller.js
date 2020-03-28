const Register = require('../models/registers');
const registerCtrl = {};

registerCtrl.getRegisters = async (req, res)=>{
    const registers = Register.find();
    res.json(registers);
}

registerCtrl.createRegister = async (req, res)=>{
    const register = new Register(req.body);
    await register.save();
    res.json({status: "correct"});
}

registerCtrl.getRegister = async (req, res) => {
    const register = Register.findById(req.params.id);
    res.json(register);
}

registerCtrl.deleteRegister = async (req, res) => {
    await Register.findByIdAndDelete(req.params.id);
    res.json({status: "correct"});
}

module.exports = registerCtrl;