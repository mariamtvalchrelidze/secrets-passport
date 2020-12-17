//jshint esversion:6
//require("dotenv").config();                  //mongoose encryption
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
//const md5 = require("md5");


mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const secret = process.env.SECRET;
//userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});         //plugin for mongoose encryption

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

  });


});
app.post("/login", function(req, res){

});




app.listen(3000, function(){
  console.log("server - 3000");
});
