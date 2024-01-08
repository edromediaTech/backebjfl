const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const groupechantSchema = mongoose.Schema({ 
  nom: {  type: String, required:true, trim: true, unique: true },
  sigle: { type: String },
  email: { type: String},
  responsable : { type: String, required:true, trim: true },  
  maestro : { type: String },  
  fondation: { type: Date, trim: true },
  telephone: { type: String, trim: true },  
  whatsapp: { type: String, trim: true, required:true},  
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});
groupechantSchema.plugin(uniqueValidator);
groupechantSchema.index({ "nom": 1, "responsable":1}, { unique: true });

module.exports = mongoose.model('Groupechant', groupechantSchema);