var express = require("express");
var app = express();

//TEMPORARY
const campgrounds = [{name: "Salmon Creek", image: "url"},{name: "Salmon Creek 3", image: "url"},{name: "Salmon Creek 2", image: "url"}]

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  //show all landing pages
  res.render('landing');
})

app.get("/campgrounds", function(req, res) {
  //show all campgrounds
  res.render('campgrounds', {data: campgrounds})
});

app.listen(3000, function() {
  console.log("Server running on port 3000.");
});
