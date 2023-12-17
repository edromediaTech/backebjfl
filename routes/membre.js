const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

//const multer = require('../middleware/multer-config');
const membreCtrl = require('../controllers/membre');
router.post('/',   membreCtrl.createMembre);
router.patch('/:id',  membreCtrl.updateMembre);
router.delete('/:id', membreCtrl.deleteMembre);
router.get('/all/', membreCtrl.getAllMembre);
router.get('/all/zone', membreCtrl.getAllMembreDistrict);


module.exports = router;