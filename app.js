var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    weatherKey  = require('./custom-modules/weatherKey').apiKey,
    ForecastIo  = require('forecast.io'),
    mongoose    = require('mongoose'),
    helpers     = require('./custom-modules/helpers');
    Campground   = require('./custom-modules/db_models')

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
var weatherEngine = new ForecastIo({APIKey: weatherKey, timeout: 500});

// Connect to MONGODB, and define schemas
mongoose.connect('mongodb://localhost/yelp_camp')

// Search Index - first get all campgrounds, then build index
var search;
Campground.find({}, (err, res) => {
 search = new helpers.Searcher(res.slice())
})

app.get('/quote', function(req, res) {
  //send a random quote back
  const randomQuote = helpers.quotes[Math.floor(Math.random() * helpers.quotes.length)]
  res.json([randomQuote]);
});

app.get('/campground', async function(req, res) {
  // requested ID will hold what was requested (either one CG or random CGs)
  var requestedID = [];
  if (req.query.id) {
    requestedID.push(req.query.id);
  } else if (req.query.random) {
    do {
      // TO--DO this shouldnt be hard Condensed
      newNum = Math.floor(Math.random() * 1578);
      if (!requestedID.includes(newNum)) requestedID.push(newNum);
    } while (requestedID.length !== 4)
  } else if (req.query.province) {
    // some province's CGs requested
    let province = helpers.provinces[req.query.province]
    province = province.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
    Campground.find({'province': province}, (error, results) => {
      // send results
      if (error) {
        res.sendStatus(401);
      } else {
        res.json(results);
      }
      return;
    });
    return;
  } else {
    res.sendStatus(401);
    return;
  }

  // Get campground data if random CG or one CG
  Campground.find({"id": {"$in": requestedID}}, async (err, results) => {
      // Handle errors
      if (!(results.length) || err) {
        res.sendStatus(404);
        return;
      };

      // Add activities logos for every campground found and reverse comments
      for (var result in results) {
        results[result].activities = results[result].activities.map(v => {
          return {name: v, logo: helpers.activitySymbols[v] || '*'}
        });
        // Reverse the comments - they are chronologically backwards.
        results[result].comments.reverse()
      }

      // If randoms requested, return results, otherwise we need to get weather
      if (!req.query.id) {
        res.json(results);
        return;
      };

      // First result must be the one requested...
      let ret = results[0]["_doc"];

      // Get weather for this campground
      ret.weather = {};
      await weatherEngine.asyncGetWeather(ret.lat, ret.lon)
        .then(data => {
          ret.weather = data.currently;
        })
        .catch(err => console.log("Error in obtaining weather data", err))

      // Send data
      res.json(ret);
  });
});

app.delete('/comment', async function(req, res) {
  // Validate the user based on supplied credentials
  try {
    var verification = await helpers.verifyUser(req.body.userID);
  } catch (err) {
    // Couldn't verify users JWT token, or no token was given in req.body.userID
    console.log(err);
    res.sendStatus(401)
    return;
  }

  // verify comment is owned by user
  var oldCommentsArray;
  Campground.find({'id': req.body.campgroundID}, (error, result) => {
    // Check for how many campgrounds were found
    if (result.length !== 1 || error) {
      console.log(error || 'Campground not valid');
      res.send(400);
      return;
    }
    oldCommentsArray = result[0].comments
    var oldCommentIdx = result[0].comments.findIndex(val => req.body.commentID === val.id)
    if (oldCommentIdx === -1 || result[0].comments[oldCommentIdx].uid !== verification) {
      // couldn't find comment, or user verification doenst match - send error
      console.log('error occuresd');
      res.sendStatus(401);
      return;
    }
    // Delete comment
    result[0].comments.splice(oldCommentIdx, 1);
    Campground.update({'id': req.body.campgroundID}, {$set: {'comments': result[0].comments}}, function(e) {
      if (e) {
        console.log(e);
        res.sendStatus(401);
        return;
      }
      console.log(result[0].comments);
      res.json(result[0].comments.reverse());
    });
  });
});

app.post('/comment', async function(req, res) {
  //post new review to given id.
  // Validate the user based on supplied credentials
  try {
    const verification = await helpers.verifyUser(req.body.userID);
  } catch (err) {
    // Couldn't verify users JWT token, or no token was given in req.body.userID
    res.sendStatus(401)
    return;
  }

  // Ensure rating and text are valid
  if (req.body.pickedRating > 5 || req.body.pickedRating < 0) {
    res.sendStatus(400);
    return;
  }
  if (!req.body.reviewText || req.body.reviewText.length < 15) {
    res.sendStatus(400);
    return;
  }

  // TO--DO check for spam, check for same review twice

  // validate campgroundID, inject into DB
  const cgID = {'id': req.body.campgroundID};
  Campground.find(cgID, (error, result) => {
    // Check for how many campgrounds were found
    if (result.length !== 1 || error) {
      res.send(400);
      return;
    }
    // Build new CG object
    const newID = result[0].comments[result[0].comments.length - 1] ? result[0].comments[result[0].comments.length - 1].id + 1 : 0
    const newReview = {
      id: newID,
      displayName: req.body.displayName,
      uid: req.body.uid,
      photoURL: req.body.photoURL,
      text: req.body.reviewText,
      time: new Date(),
      rating: req.body.pickedRating
    }
    Campground.update(cgID, {$push: {comments: newReview}}, (writeError, writeStatus) => {
      if (writeStatus.ok !== 1) {
        res.json(400);
        return;
      }
      res.json(newReview);
    })
  });
});

app.get('/search', function(req, res) {
  res.json(search.doSearch(req.query.q))
});

app.use(function(req, res) {
  res.sendStatus(404);
})
app.listen(3001, function() {
  console.log("Server running on port 3001 (http://localhost:3001).");
});
