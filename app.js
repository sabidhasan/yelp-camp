var express = require("express");
var app = express();
var bodyParser = require('body-parser');

// Settings
app.use(bodyParser.json());
app.set("view engine", "ejs");

// TEMPORARY
let campgrounds = [
  {id: 0, name: "Salmon Creek", image: "url"},
  {id: 1, name: "Salmon Creek 3", image: "url"},
  {id: 2, name: "Salmon Creek 2", image: "url"}
]



app.get('/campgrounds', function(req, res) {
  // return all campgrounds for front end
  res.json(campgrounds);
});
app.post('/campgrounds', function(req, res) {
  //add to campgrounds array... basic validation
  try {
    if (req.body.name.length > 10 || req.body.image.length > 20) throw new Error();
    console.log("ADDING TO DB");
    //add to array
    campgrounds.push({id: campgrounds.length, name: req.body.name, image: req.body.image});
    res.json(campgrounds);
    return;
  } catch (err) {
    //send error
    console.log("SENDING ERROR", err);
    res.sendStatus(403);
  }
});

app.listen(3001, function() {
  console.log("Server running on port 3000.");
});
