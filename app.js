//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const secret = process.env.SECRET;
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);


app.use(express.static("public"));
app.set('view engine', 'ejs' );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  const user = new User({
    email: req.body.username,
    password: req.body.password
  });
  user.save(function(err){
    if(!err){
      res.render("secrets");
    }
  });

});
app.post("/login", function(req, res){
  User.findOne({email: req.body.username}, function(err, user){
    console.log(user);
    if(!err && user != null){
      if(user.password === req.body.password){
        res.render("secrets");
      }
      else res.render("home");
    }else res.render("home");
  });
});




app.listen(3000, function(){
  console.log("server - 3000");
});
