//jshint esversion:6
const express =  require("express");
require("dotenv").config(); 
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require("./models/user");
const md5 = require('md5');



const app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const dbURI = "mongodb+srv://secret:secret9019@secretcluster.mpize.mongodb.net/secretDB";
mongoose.connect(dbURI)
.then((result) => app.listen(8000, console.log("db Connected")))
.catch((err) => console.log(err));




//routes

app.get("/", (req, res) => {
    res.render("home")
});


app.get("/login", (req, res) => {
    res.render("login")
});


app.get("/register", (req, res) => {
    res.render("register")
});


app.post("/register", (req, res) => {
    const newUser = new User({
            email: req.body.username,
            password: md5( req.body.password )
        });

        newUser.save((err, data) => {
            if(err){
                console.log(err);
            }else{
                res.render("secrets")
            }
        });
});

app.post("/login", (req, res) => {
   const username = req.body.username;
   const password = md5( req.body.password );

   User.findOne({email: username}, (err, data) => {
       if(err){
           console.log(err);
       }else{
           if(data){
               if(data.password === password){
                   res.render("secrets")
               }
           }
       }
   })
});






