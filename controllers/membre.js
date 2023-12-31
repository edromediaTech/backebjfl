const Zone = require('../models/zone');
const Membre = require('../models/membre');
const District = require('../models/district');
const mongoose = require('mongoose');

const logger = require("../utils/logger");

//const {role} = require('../role');

exports.createMembre = async (req, res, next) => {         
  const membreObject = req.body;
  delete membreObject._id;
  delete membreObject._userId;
  console.log(membreObject)
  const membre = new Membre({
      ...membreObject,             
  });

  membre.save()
  .then(() => { 
    Zone.findOne({ _id: membreObject.zone }, (err, zone) => {
        
      if (zone) {
          zone.membres.push(membre);
          zone.save();
          res.status(201).json(membre)
      }
  });
    
  })
  .catch(error => {console.log(error); res.status(400).json( { error })})
 
}


exports.updateMembre = (req, res, next) => {
    const membreObject = req.body;
    delete membreObject._id;
    delete membreObject._membreId;
    const membre = new Membre({
      _id: req.params.id,
      ...membreObject ,      
      });
    Membre.updateOne({_id: req.params.id}, membre).then(
      () => {
        res.status(201).json({
          message: 'membre updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


exports.getAllMembre = async(req, res, next) => { 
  Membre.find().then(
    (membres) => {
      res.status(200).json(membres);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };

exports.getAllMembreZone = async(req, res, next) => { 
  Zone.find().populate("membres").then(
    (zones) => {
      res.status(200).json(zones);
    }
  ).catch(
    (error) => {
      res.status(401).json({
        error: error
      });
    }
  ); 
 };

exports.getAllMembreDistrict = async(req, res, next) => { 
  try {
    // Récupérer tous les districts avec peuplement des zones et membres
    const districts = await District.find().populate({
      path: 'zones',
      model: 'Zone',
      populate: {
        path: 'membres',
        model: 'Membre'
      }
    }).exec();

    // Envoyer le tableau de districts en réponse
    res.status(201).json({ districts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des districts.' });
  }
 };

 exports.deleteMembre = (req, res, next) => {
  Membre.findOne({ _id: req.params.id})
      .then(membre => {
                  const membre_id =  mongoose.Types.ObjectId(membre._id)                  
                  const zone_id =  membre.zone                
                  
                  membre.deleteOne({_id: req.params.id})
                      .then(() => { 
                        Zone.findOne({ _id: zone_id }, (err, zone) => {
                          if (zone) {
                              
                              zone.membres.splice(zone.membres.indexOf(membre_id),1);
                              zone.save();
                              
                          }
                      });                      
                        
                        res.status(200).json({message: 'membre supprimé !'})
                    })
                      .catch(error => res.status(401).json({ error }));
              })       
      
      .catch( error => {
          res.status(500).json({ error });
      });
};


 