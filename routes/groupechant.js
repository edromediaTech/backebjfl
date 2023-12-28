const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const groupechantCtrl = require('../controllers/groupechant');
router.post('/',   groupechantCtrl.createGroupechant);
//router.patch('/:id',  groupechantCtrl.updategroupechant);
router.delete('/:id', groupechantCtrl.deleteGroupechantById);
router.get('/all/', groupechantCtrl.getAllGroupechants);


module.exports = router;