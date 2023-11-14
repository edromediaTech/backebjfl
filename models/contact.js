const mongoose = require('mongoose');


const contactSchema = mongoose.Schema({
  nom: {type: String, required: true}, 
  email: {type: String, required: true }, 
  message: {type: String, required: true }, 
  
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});


module.exports = mongoose.model('Contact', contactSchema);