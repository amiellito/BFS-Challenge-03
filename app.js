const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/catDB", { useNewUrlParser: true, useUnifiedTopology: true});

const catSchema = {
  url: String
};

 const Cat = mongoose.model("Image", catSchema); //MODEL NAME "Image" is COLLECTION NAME in DB(mongoose turns it to 'images' - small letter plural)

////////////// ROUTE ////////////////////



app.get("/images", function(req, res){
  Cat.find(function(err, foundCat){
    if(!err){
      res.send(foundCat);
      console.log(foundCat[0].url)
    } else {
      console.log(err);
    }
  });
});



// app.route("/images")

//   .get(function(req, res){
//     CatImage.find(function(err, foundCat){
//       if(!err){
//         res.send(foundCat);
//       } else {
//         console.log(err);
//       }
//     })
//   });



app.listen(3000, function(){
  console.log("Listening to port 3000")
});