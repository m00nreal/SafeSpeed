const express = require('express');
const router = express.Router();

const register = require('../controllers/register.controller');

router.get('/', register.getRegisters);
router.post('/', register.createRegister);
router.get('/:id', register.getRegister);
router.put('/:id', register.editRegister);
router.delete('/:id', register.deleteRegister);

module.exports = router;