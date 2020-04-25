const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const user = require('../controllers/user.controller');

router.get('/', user.getUsers);
router.post('/', user.createUser);
router.get('/:id', verifyToken, user.getUser);
router.put('/:id', verifyToken, user.editUser);
router.delete('/:id', user.deleteUser);
router.post('/login', user.login);

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