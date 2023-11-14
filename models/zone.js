const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Membre = require('../models/membre');

const zoneSchema = mongoose.Schema({
  code:{  type: String, required:true, trim: true,unique:true },
  nom: {type: String, required: true, trim: true }, 
  membres: [{type:mongoose.Schema.Types.ObjectId, ref:"Membre"}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

zoneSchema.plugin(uniqueValidator);
zoneSchema.index({ "nom": 1 }, { unique: true });

module.exports = mongoose.model('Zone', zoneSchema);