const User = require('../models/user');
const jwt = require('jsonwebtoken');
const userCtrl = {};

userCtrl.getUsers = async (req,res) => {
    var usrs = await User.find();
    res.json(usrs);
    //res.json({'status': 'error'});
}

userCtrl.getUser = async (req,res) => {
    var id = req.userId;
    await User.findById(id)
        .then( (result) => {
            res.json(result);
        })
        .catch( (err) => {
            res.json({'status' : 'error'})
        });
}

userCtrl.createUser = async (req,res) => {
    var {password, password2} = req.body;
    if(password == password2){
        var newUser = new User(req.body);
        await newUser.save();
        var token = jwt.sign({_id: newUser._id}, 't6qxsu32SafeSpeed');
        res.status(200).json(token);
    }else{
        return res.status(401).send("Las contraseñas no coinciden");
    }
}

userCtrl.deleteUser = async (req,res) => {
    res.json({
        'satus' : 'error'
    });
}

userCtrl.editUser = async (req,res) => {
    var {id} = req.params;
    var usr = {
        user: req.body.user,
        password: req.body.password,
        name: req.body.name,
        key: req.body.key
    }
    await User.findByIdAndUpdate(id, {$set: usr}, {new: true})
        .then(()=>{
            res.json({
                'status' : 'Usuario actualizado.'
            });
        })
        .catch((err) => {
            res.json({
                'status' : 'error'
            });
        });
}

userCtrl.login = async (req,res) => {
    var usr = req.body.usuario;
    var pswd = req.body.password;
    var userbd = await User.findOne({usr});
    if(!userbd) return res.status(401).send("El usuario no existe.");
    if(userbd.password !== pswd) res.status(401).send("La contraseña es incorrecta.");
    var token = jwt.sign({_id: userbd._id}, 't6qxsu32SafeSpeed');
    return res.status(200).json({token});
}

module.exports = userCtrl;

function getIdFromToken(req){
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, 't6qxsu32SafeSpeed')
    req.userId = payload;
    return payload;
}