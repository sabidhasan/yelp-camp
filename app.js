var express    = require("express"),
    app        = express(),
    bodyParser = require('body-parser'),
    weatherKey = require('./custom-modules/weatherKey').apiKey,
    ForecastIo = require('forecast.io'),
    mongoose   = require('mongoose'),
    helpers    = require('./custom-modules/helpers')

    sampleData = require('./custom-modules/sample-data')

// Allow parsing body from post requests
app.use(bodyParser.json());
// ForecastIo is not promisified - adding asyncGetWeather method to allow a
// promise-based wrapper around native 'get' method
ForecastIo.prototype.asyncGetWeather = function(lat, lon) {
  return new Promise(function(resolve, reject) {
    weatherEngine.get(lat, lon, function(error, results, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
}
var weatherEngine = new ForecastIo({APIKey: weatherKey, timeout: 1000});


// Connect to MONGODB, and define schemas
mongoose.connect('mongodb://localhost/yelp_camp')
var campgroundSchema = new mongoose.Schema({
  name: String, province: String, lat: Number, lon: Number,
  sites: Number, image: [String], email: String, address: String,
  comments: [], paymentMethods: [], region: String, type: String,
  id: Number, description: String, phone: String,
  activities: [String],
  hours: {seasonal: {type: [String]}, daily: String},
  prices: {seasonal: [Number], daily: [Number], weekly: [Number]}
});
const Campground = mongoose.model("Campground", campgroundSchema);

// TEMPORARY
const activities = sampleData.activities
const getRandomActivities = sampleData.getRandomActivities
let campgrounds = sampleData.campgrounds
const search = new sampleData.searcher(campgrounds);

app.get('/quote', function(req, res) {
  //send a random quote back
  const randomQuote = helpers.quotes[Math.floor(Math.random() * helpers.quotes.length)]
  res.json([randomQuote]);
});

app.get('/campground', async function(req, res) {
  // return a particular campground
  if (!(req.query.id)) res.json(404)

  // Get database from DB
  Campground.find({"id": req.query.id}, async (err, results) => {
    // Handle errors
    if (!(results.length) || err) res.sendStatus(404);
    // Grab first result - should only be one since searching by ID...
    ret = results[0]["_doc"];

    // Give activities their symbols
    ret.activities = ret.activities.map(v => {
      return {name: v, logo: helpers.activitySymbols[v] || '*'}
    });

    // Get weather
    ret.weather = {}
    await weatherEngine.asyncGetWeather(ret.lat, ret.lon)
      .then(data => ret.weather = data.currently)
      .catch(err => console.log("Error in obtaining weather data", err))

    res.json(ret)
  })

  // if (campgrounds[req.query.id]) {
    // const lat = campgrounds[req.query.id].lat
    // const lon = campgrounds[req.query.id].lon
    // campgrounds[req.query.id].weather = {}
    // await weatherEngine.forecast(lon, lat).then(function(data) {
    //   data = data.currently;
    //   const kmWindspeed = data.windSpeed * 1.6;
    //
    //   campgrounds[req.query.id].weather.summary = data.summary;
    //   campgrounds[req.query.id].weather.temperature = (data.temperature - 32) * 5 / 9;
    //   campgrounds[req.query.id].weather.humidity = data.humidity * 100
    //   campgrounds[req.query.id].weather.windSpeed = kmWindspeed < 5 ? 'calm': kmWindspeed;
    // });

    // res.json(campgrounds[req.query.id]);
    // return;
  // } else {
    // res.sendStatus(400);
    // return;
  // }
  //send all campgrounds, since no valid request
  // res.json(campgrounds);
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
