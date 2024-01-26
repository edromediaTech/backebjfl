const Preuvedon = require('../models/preuvedon'); // Assurez-vous d'ajuster le chemin selon votre structure de fichiers

// Créer un enregistrement Preuvedon
const createPreuvedon = async (req, res) => {
  try {
    const preuvedon = new Preuvedon(req.body);
    await preuvedon.save();
    res.status(201).send(preuvedon);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Lire tous les enregistrements Preuvedon
const getAllPreuvedons = async (req, res) => {
  try {
    const preuvedons = await Preuvedon.find();
    res.send(preuvedons);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Lire un enregistrement Preuvedon par ID
const getPreuvedonById = async (req, res) => {
  try {
    const preuvedon = await Preuvedon.findById(req.params.id);
    if (!preuvedon) {
      return res.status(404).send({ message: 'Preuvedon non trouvé' });
    }
    res.send(preuvedon);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Mettre à jour un enregistrement Preuvedon par ID
const updatePreuvedonById = async (req, res) => {
  try {
    const preuvedon = await Preuvedon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!preuvedon) {
      return res.status(404).send({ message: 'Preuvedon non trouvé' });
    }
    res.send(preuvedon);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Supprimer un enregistrement Preuvedon par ID
const deletePreuvedonById = async (req, res) => {
  try {
    const preuvedon = await Preuvedon.findByIdAndDelete(req.params.id);
    if (!preuvedon) {
      return res.status(404).send({ message: 'Preuvedon non trouvé' });
    }
    res.send(preuvedon);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPreuvedon,
  getAllPreuvedons,
  getPreuvedonById,
  updatePreuvedonById,
  deletePreuvedonById,
};
