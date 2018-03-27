var express = require("express");
var app = express();

//TEMPORARY
const campgrounds = [
  {id: 0, name: "Salmon Creek", image: "url"},
  {id: 1, name: "Salmon Creek 3", image: "url"},
  {id: 2, name: "Salmon Creek 2", image: "url"}
]

app.set("view engine", "ejs");


app.get("/campgrounds", function(req, res) {
  //show all campgrounds
  // res.render('campgrounds', {data: campgrounds})
  res.json(campgrounds);
});

app.listen(3001, function() {
  console.log("Server running on port 3000.");
});
