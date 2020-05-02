const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const register = require('../controllers/register.controller');

router.get('/', verifyToken, register.getRegisters);
router.post('/', register.createRegister);
router.get('/:id', register.getRegister);
router.put('/:id', register.editRegister);
router.delete('/:id', register.deleteRegister);

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send("Autorización inválida.");
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send("Autorización inválida.");
    }
    const payload = jwt.verify(token, 't6qxsu32SafeSpeed')
    req.userId = payload;
    next();
}