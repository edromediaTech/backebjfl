const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const preuvedonchema = mongoose.Schema({   
 data: {type: Buffer}, // donnee binaire de l´image
 contentType: {type: String}, // extension de l´imege
 created_at: {type: Date, default: Date.now },
 updated_at: {type: Date, default: Date.now }
});
preuvedonchema.plugin(uniqueValidator);
preuvedonchema.index({ "data": 1}, { unique: true });

module.exports = mongoose.model('Preuvedon', preuvedonchema);