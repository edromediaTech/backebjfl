const express = require('express');
const router = express.Router();
const donController = require('../controllers/don');

// Routes pour les opérations CRUD
router.post('/', donController.createDon);
router.get('/', donController.getAllDons);
router.get('/:id', donController.getDonById);
router.put('/:id', donController.updateDon);
router.delete('/:id', donController.deleteDon);

module.exports = router;
