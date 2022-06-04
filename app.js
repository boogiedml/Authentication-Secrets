const express =  require("express");
require("dotenv").config(); 
const mongoose = require('mongoose');
const User = require("./models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;



const app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());


mongoose.connect(process.env.dbURI)
.then(result => app.listen(process.env.PORT, console.log("Database Connected")))
.catch(err => console.log(err));




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
    bcrypt.hash( req.body.password, saltRounds, (err, hash) => {
        
        const newUser = new User({
            email: req.body.username,
            password: hash
        });

        newUser.save((err, data) => {
            if(err){
                console.log(err);
            }else{
                res.render("secrets")
            }
        });
    });
    
});

app.post("/login", (req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   User.findOne({email: username}, (err, data) => {
       if(err){
           console.log(err);
       }else{
           if(data){
                bcrypt.compare( password, data.password, function(err, result) {
                    if( result == true ){
                        res.render("secrets")
                    }
                });
           }
       }
   })
});






