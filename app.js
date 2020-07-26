const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //STATIC FILES LIKE "styles.css"

mongoose.connect("mongodb+srv://admin-amiel:Test1234@alcluster.sg4dx.mongodb.net/catDB", { useNewUrlParser: true, useUnifiedTopology: true});

const catSchema = {
  url: String
};

 const Cat = mongoose.model("Image", catSchema); //MODEL NAME "Image" is COLLECTION NAME in DB(mongoose turns it to 'images' - small letter plural)




////////////// ROUTE ////////////////////

app.get("/images", function(req, res){
  Cat.find(function(err, foundCat){
    if(!err){
      res.send(foundCat[Math.floor(Math.random() * foundCat.length)]);
    } else {
      console.log(err);
    }
  });
});

app.get("/", function(req, res){
  Cat.find(function(err, foundCat){
    if(!err){
      const catImage = foundCat[Math.floor(Math.random() * foundCat.length)].url;
      res.render('index', {catImage:catImage});
    } else {
      console.log(err);
    }
  });
});



app.post("/", function(req, res){
  const newCatImage = new Cat({
    url: req.body.catUrl
  });

  var newCat = newCatImage.url;
  
  newCatImage.save(function(err){
    if(!err){
      res.render('success', {newCat:newCat});
    } else {
      res.send(err)
    }
  });
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Listening to port 3000")
});