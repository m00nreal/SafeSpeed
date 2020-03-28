const User = require ('../models/users');
const userCtrl = {};

userCtrl.getUsers = async (req,res)=>{
    const users = await User.find();
    res.json(users);
}

userCtrl.createUser = async (req,res)=>{
    const user = new User(req.body);
    await user.save();
    res.json({status:"correct"});
}

userCtrl.getUser = async (req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

userCtrl.editUser = async (req,res) => {
    const {id} = req.params;
    const userData = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        key: req.body.key
    }
    await User.findByIdAndUpdate(id, {$set: userData}, {new: true});
    res.json({status: "correct"});
}

userCtrl.deleteUser = async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({status: "correct"});
}

module.exports = userCtrl;