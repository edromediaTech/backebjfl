const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const donchema = mongoose.Schema({ 
  nom: {  type: String, required:true, trim: true, unique: true },
  prenom: {  type: String, required:true, trim: true, unique: true },
  pays :{  type: String, required:true },
  ville :{  type: String, required:true },
  service :{  type: String, required:true }, // banque, cashapp, zelle
  depensecible:{type:String}, // vise une activite ou uneentite pour depenser
  district: { type: String },
  preuve: { type: String }, // path fiche de depot
  Idtrans: { type: String }, // Id transaction de depot
  datetrans:{type:Date}, // date de la transaction
  notrans:{type:String}, // numero transaction
  email: { type: String},
  montant : { type: Number, required:true, trim: true },  
  devise: { type: String },// dollar ou gourde
  telephone: { type: String, trim: true },  
  type: { type: String, required:true },  // dime, ofrande, ofrande moisson, don particulier
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
donchema.plugin(uniqueValidator);
donchema.index({ "nom": 1,"prenom":1, "datetrans":1, "montant":1}, { unique: true });

module.exports = mongoose.model('Don', donchema);