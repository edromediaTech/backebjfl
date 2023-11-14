const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Zone = require('../models/zone');

const districtSchema = mongoose.Schema({
  code:{  type: String, required:true, trim: true,unique:true },
  nom: {type: String, required: true, trim: true }, 
  zones: [{type:mongoose.Schema.Types.ObjectId, ref:"Zone"}],
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

districtSchema.plugin(uniqueValidator);
districtSchema.index({ "nom": 1 }, { unique: true });

module.exports = mongoose.model('District', districtSchema);