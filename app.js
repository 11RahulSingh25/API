const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine",ejs);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static("public"));


mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const Article = mongoose.model("Article",{
     title: String,
     content: String 
    })


app.listen(3000,()=>{
    console.log("server is running at port 30000");
})