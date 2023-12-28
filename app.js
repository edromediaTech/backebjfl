const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const bodyParser = require('body-parser')


const logger = require('./utils/logger');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express(); 
//const con ='mongodb+srv://sironel:Phigando1@cluster0.4syq9jj.mongodb.net/?retryWrites=true&w=majority';
const con ='mongodb+srv://sironel:Phigando1@cluster0.4syq9jj.mongodb.net/ebjfl';
//const con ='mongodb://localhost:27017/CEEdb?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
//const con ='mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@cluster0.4syq9jj.mongodb.net/?retryWrites=true&w=majority';
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({extended:true}))
const {role} = require('./role');

const path = require('path');



app.use(cors({
  origin: ['http://localhost:3000','https://backend.ebjfl.org'],
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
//app.use(session({secret: "Shh, its a secret!"}));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

//Recuperation des routes

const userRoutes = require('./routes/user');
const anneeRoutes = require('./routes/annee');
const contactRoutes = require('./routes/contact');

const roleRoutes = require('./routes/role');
const mailRoutes = require('./routes/mail');
const actualiteRoutes = require('./routes/actualite');
const commentRoutes = require('./routes/comment');
const membreRoutes = require('./routes/membre');
const groupechantRoutes = require('./routes/groupechant');


mongoose.set("strictQuery", false);
//connexion a  la base de donnees
mongoose.connect(con,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !--'+error.message));

  

app.use(express.json());

//Middleware to manage cross over
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//base des routes

app.use('/api/auth', userRoutes);
app.use('/api/annee', anneeRoutes);

app.use('/api/contact', contactRoutes);

app.use('/api/role', roleRoutes);
app.use('/api/mail', mailRoutes);

app.use('/api/actualite', actualiteRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/membre', membreRoutes);
app.use('/api/groupechant', groupechantRoutes);


app.get('/',(req,res,next)=>{
  //res.sendFile('html/welcome.html');
  res.sendFile(path.join(__dirname+'/html/welcome.html'));
  logger.info("Server Sent A file!");
  //res.end('<h1>server started...</h1>');
});

module.exports = app;