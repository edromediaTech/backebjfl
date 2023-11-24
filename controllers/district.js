const Zone = require('../models/zone');
const District = require('../models/district');
const mongoose = require('mongoose');

const logger = require("../utils/logger");

//const {role} = require('../role');

// exports.createMembre = async (req, res, next) => {         
//   const membreObject = req.body;
//   delete membreObject._id;
//   delete membreObject._userId;
//   console.log(membreObject)
//   const membre = new Membre({
//       ...membreObject,             
//   });

//   membre.save()
//   .then(() => { 
//     Zone.findOne({ _id: membreObject.zone }, (err, zone) => {
        
//       if (zone) {
//           zone.membres.push(membre);
//           zone.save();
//           res.status(201).json(membre)
//       }
//   });
    
//   })
//   .catch(error => { res.status(400).json( { error })})
 
// }


// exports.updateMembre = (req, res, next) => {
//     const membreObject = req.body;
//     delete membreObject._id;
//     delete membreObject._membreId;
//     const membre = new Membre({
//       _id: req.params.id,
//       ...membreObject ,      
//       });
//     Membre.updateOne({_id: req.params.id}, membre).then(
//       () => {
//         res.status(201).json({
//           message: 'membre updated successfully!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };


exports.getAllDistrict = async(req, res, next) => { 
  District.find().populate("zones").then(
    (districts) => {
      res.status(200).json(districts);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };

 