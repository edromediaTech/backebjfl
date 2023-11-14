const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Comment = require('../models/comment');
const User = require('../models/user');

const actualiteSchema = mongoose.Schema({
  titre: {type: String, required: true},   
  slug: {type: String, required: true},   
  body: {type: String, required: true},     
  image: {type: String},   
  editeur: {type: String},   
  approuve: {type: Boolean, default: false},   
  publie: {type: Boolean, default: false},   
  nocomment: {type: Boolean, default: false},   
  categorie: {type: String},   
  cible: {type: String},   
  links: [{type: String}], 
  comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}], 
  
  auteur:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

actualiteSchema.plugin(uniqueValidator);
actualiteSchema.index({ "titre": 1,"slug":1}, { unique: true });

module.exports = mongoose.model('Actualite', actualiteSchema);