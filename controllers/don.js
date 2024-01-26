const { log } = require('winston');
const Don = require('../models/don');

// Fonction pour créer un don
exports.createDon = async (req, res) => {
  console.log(req.body)
  try {
   // const { montant, description } = req.body;
    //const don = new Don({ montant, description });
    const don = new Don(req.body);
    const savedDon = await don.save();
    res.status(201).json(savedDon);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour obtenir tous les dons
exports.getAllDons = async (req, res) => {
  try {
    const dons = await Don.find();
    res.status(200).json(dons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour obtenir un don par son ID
exports.getDonById = async (req, res) => {
  try {
    const don = await Don.findById(req.params.id);
    if (!don) {
      return res.status(404).json({ message: 'Don not found' });
    }
    res.status(200).json(don);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour mettre à jour un don par son ID
exports.updateDon = async (req, res) => {
  try {
    const updatedDon = await Don.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDon) {
      return res.status(404).json({ message: 'Don not found' });
    }
    res.status(200).json(updatedDon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour supprimer un don par son ID
exports.deleteDon = async (req, res) => {
  try {
    const deletedDon = await Don.findByIdAndDelete(req.params.id);
    if (!deletedDon) {
      return res.status(404).json({ message: 'Don not found' });
    }
    res.status(200).json(deletedDon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
