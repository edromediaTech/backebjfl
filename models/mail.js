const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');


const mailSchema = mongoose.Schema({
  from: {type: String},   
  to: [{type: String}],   
  subject: {type: String},      
  html: {type: String},   
  lu: {type: Boolean, default: false},   
  trash: {type: Boolean, default: false},   
  attach: [{type: String}],       

  created_at: {type: Date, default: Date.now },
  
});

//mailSchema.plugin(uniqueValidator);
//mailSchema.index({ "titre": 1,"slug":1}, { unique: true });

module.exports = mongoose.model('Mail', mailSchema);