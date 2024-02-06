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


// app.route("/articles").get().post().delete();

app.get("/articles",(req,res)=>{
    Article.find()
    .then((foundArticles) => {
       res.send(foundArticles)
  }).catch((err) => console.log(err))
})

app.post("/articles",(req,res)=>{
    const articles = new Article({
        title:req.body.title,
        content :req.body.content
    })

    articles.save()
    .then(res.send("data inserted"))
    .then((err)=>console.log(err))
})

app.delete("/articles",(req,res)=>{
    Article.deleteMany({})
    .then(res.send("Deleted all articles"))
    .then((err)=>console.log(err))
})

//////////////////// Targeting specific title ////////////////////

app.route("/articles/:articleTitle")

.get((req,res)=>{
    Article.findOne({title: req.params.articleTitle})
    .then((foundArticle)=>{
        if(foundArticle) res.send(foundArticle)
        else res.send("Article not found")
    })
    .then((err)=> console.log(err))
})

.put((req,res)=>{
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content}
        )
        .then(res.send("Successfully updated"))
        .then((err)=>console.log(err))
})

.delete((req,res)=>{
    Article.deleteOne({title : req.params.articleTitle})
    .then(res.send("Deleted Successfully"))
    .then((err)=>console.log(err))
});

app.listen(3000,()=>{
    console.log("server is running at port 30000");
})