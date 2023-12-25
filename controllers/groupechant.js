const Groupechant = require('../models/groupechant');

// Fonction pour créer un nouveau Groupechant
const createGroupechant = async (req, res) => {
    
  try {
    const groupechant = new Groupechant(req.body);
    await groupechant.save();
    res.status(201).json(groupechant);
  } catch (error) {   
    res.status(400).json(error);
  }
};

// Fonction pour obtenir tous les Groupechants
const getAllGroupechants = async (req, res) => {
  try {
    const groupechants = await Groupechant.find();
    res.json(groupechants);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Fonction pour obtenir un Groupechant spécifique par son ID
const getGroupechantById = async (req, res) => {
  try {
    const groupechant = await Groupechant.findById(req.params.id);
    if (!groupechant) {
      return res.status(404).json();
    }
    res.json(groupechant);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Fonction pour mettre à jour un Groupechant spécifique par son ID
const updateGroupechantById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['champ1', 'champ2', 'champ3']; // Remplacez par les champs autorisés dans votre modèle
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Mise à jour invalide!' });
  }

  try {
    const groupechant = await Groupechant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!groupechant) {
      return res.status(404).json();
    }
    res.json(groupechant);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Fonction pour supprimer un Groupechant spécifique par son ID
const deleteGroupechantById = async (req, res) => {
  try {
    const groupechant = await Groupechant.findByIdAndDelete(req.params.id);
    if (!groupechant) {
      return res.status(404).json();
    }
    res.json(groupechant);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createGroupechant,
  getAllGroupechants,
  getGroupechantById,
  updateGroupechantById,
  deleteGroupechantById
};
