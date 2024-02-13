const express = require('express');
const router = express.Router();
const preuvedonController = require('../controllers/preuvedon');
const Preuvedon = require('../models/preuvedon');
const multer = require("multer")
const storage = multer.memoryStorage(); // Stockage en mémoire pour les données de l'image
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
 
  try {
    const newPreuvedon = new Preuvedon({      
        data: req.file.buffer,
        contentType: req.file.mimetype,
      });

    const preuve = await newPreuvedon.save();
    res.status(201).send(preuve);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/preuve/:id', async (req, res) => {
  try {
      const image = await Preuvedon.findById(req.params.id);
      if (!image) {
          return res.status(404).json({ message: "Image not found" });
      }
      res.set('Content-Type', image.contentType);
      res.send(image.data);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
  }
});

// router.post('/preuvedons', preuvedonController.createPreuvedon);
// router.get('/preuvedons', preuvedonController.getAllPreuvedons);
// router.get('/preuvedons/:id', preuvedonController.getPreuvedonById);
// router.patch('/preuvedons/:id', preuvedonController.updatePreuvedonById);
// router.delete('/preuvedons/:id', preuvedonController.deletePreuvedonById);

module.exports = router;