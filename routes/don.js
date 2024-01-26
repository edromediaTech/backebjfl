const express = require('express');
const router = express.Router();
const donController = require('../controllers/don');
// // upload image preuve
// const fs = require('fs')
// const multer = require("multer")

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
//   };
  
//   const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, 'preuves');
//     },
//     filename: (req, file, callback) => {
//       const name = file.originalname.split(' ').join('_');
//       const extension = MIME_TYPES[file.mimetype];
//       callback(null,  Date.now() + name);
//     }
//   });
//   const upload = multer({storage:storage})

// Routes pour les opérations CRUD
router.post('/', donController.createDon);
router.get('/', donController.getAllDons);
router.get('/:id', donController.getDonById);
router.put('/:id', donController.updateDon);
router.delete('/:id', donController.deleteDon);
// router.post('/upload/', upload.single('imgfile'),(req, res) => {
//     //const img = fs.readFileSync(req.file.path)

//     //let extArray = req.file.mimetype.split("/");
//     //let extension = extArray[extArray.length - 1];
    
//     res.status(200).json({path: `${req.protocol}://${req.get('host')}/preuves/${req.file.filename}`
//     ,filename:req.file.filename,originalname:req.file.originalname})
//     // res.status(200).json(img)
// });
// router.post('/delimagepreuve',(req,res)=>{
//   const filename = req.body.filename.split('/preuves/')[1];  
//   //console.log(`devoirs/${filename}`)  
//   fs.unlink(`preuves/${filename}`, () => {
//       res.status(200).json({message: 'fichier supprimé !'})})            
// });
module.exports = router;
