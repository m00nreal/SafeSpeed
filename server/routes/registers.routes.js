const express = require ('express');
const router = express.Router();

const registerCtrl = require("../controllers/registers.controller");

router.get('/', registerCtrl.getRegisters);
router.post('/',registerCtrl.createRegister);
router.get('/:id', registerCtrl.getRegister);
router.delete('/:id', registerCtrl.deleteRegister);

module.exports = router;