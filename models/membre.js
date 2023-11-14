const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Zone = require('../models/zone');
const User = require('../models/user');

const membreSchema = mongoose.Schema({
  code:{  type: String, required:true, trim: true,unique:true },
  nom: {  type: String, required:true, trim: true },
  prenom: { type: String, required: true, trim: true },
  sexe: { type: Boolean, required: true , trim: true },
  adresse: { type: String },
  baptise:{type:Boolean, default:false},
  naissance: { type: Date, trim: true },
  telephone: { type: String, trim: true },
  zone:{type:mongoose.Schema.Types.ObjectId,ref:"Zone"}, 
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}, 
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
membreSchema.plugin(uniqueValidator);
membreSchema.index({ "nom": 1,"prenom":1,"sexe":1,"telephone":1}, { unique: true });

module.exports = mongoose.model('Membre', membreSchema);