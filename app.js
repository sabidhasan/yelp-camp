var express    = require("express"),
    app        = express(),
    bodyParser = require('body-parser'),
    sampleData = require('./custom-modules/sample-data'),
    mongoose   = require('mongoose')


// Allow parsing body from post requests
app.use(bodyParser.json());
// app.set("view engine", "ejs");

// Connect to MONGODB, and define schemas
mongoose.connect('mongodb://localhost/yelp_camp')
var campgroundSchema = new mongoose.Schema({
  name: String, province: String, lat: Number, lon: Number,
  sites: Number, image: [String], email: String, address: String,
  comments: [], paymentMethods: [], region: String, type: String,
  id: Number, description: String, phone: String,
  activities: [{name: String, logo: String}],
  hours: {seasonal: {type: [String]}, daily: String},
  prices: {seasonal: [Number], daily: [Number], weekly: [Number]}
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
  name: 'testoing 1234', province: "Ontario"
})

// TEMPORARY
const activities = sampleData.activities
const getRandomActivities = sampleData.getRandomActivities
let campgrounds = sampleData.campgrounds
const quotes = sampleData.quotes
const search = new sampleData.searcher(campgrounds);

app.get('/quote', function(req, res) {
  //send a random quote back
  res.json([quotes[Math.floor(Math.random() * quotes.length)]]);
});
app.get('/randomCampground', function(req, res) {
  const random = Math.floor(Math.random(campgrounds.length))
  res.json(campgrounds[random])
})


app.get('/campground', function(req, res) {
  // return a particular campground (if requested) or all campgrounds
  if (req.query.id) {
    // TO-DO: MONGODB WILL HANDLE THIS REQUEST
    if (campgrounds[req.query.id]) {
      res.json(campgrounds[req.query.id]);
      return;
    } else {
      res.sendStatus(400);
      return;
    }
  }
  //send all campgrounds, since no valid request
  res.json(campgrounds);
});
app.post('/campground', function(req, res) {
  //add to campgrounds array... basic validation
  try {
    if (req.body.name.length > 10 || req.body.image.length > 20) throw new Error();
    console.log("ADDING TO DB");
    //add to array
    campgrounds.push({id: campgrounds.length, name: req.body.name, comments: [], image: req.body.image});
    res.json(campgrounds);
    return;
  } catch (err) {
    //send error
    console.log("SENDING ERROR", err);
    res.sendStatus(403);
  }
});

app.post('/comment', function(req, res) {
  //post new comment to given id
  //MONGO DB will handle this
  //validate author, pickedRating, reviewText
  console.log('new post request');
  if (req.body.pickedRating > 5 || req.body.pickedRating < 0) {
    res.sendStatus(403);
  } else if (!req.body.reviewText || req.body.reviewText.length < 10) {
    res.sendStatus(403);
  } else {
    //add to db
    const newComment = {
      id: campgrounds[req.body.id].comments.length,
      author: req.body.author,
      rating: req.body.pickedRating,
      time: new Date(),
      text: req.body.reviewText
    }

    if (!campgrounds[req.body.id]) res.sendStatus(403);

    campgrounds[req.body.id].comments.push(newComment);
    res.json(newComment)
  }
});

app.get('/search', function(req, res) {

  res.json(search.doSearch(req.query.q))
  // res.json(search.doSearch());

});

app.listen(3001, function() {
  console.log("Server running on port 3001 (http://localhost:3001).");
});
