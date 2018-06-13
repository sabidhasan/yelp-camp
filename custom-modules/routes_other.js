var express    = require("express");
var router     = express.Router();
var Campground = require('./db_models');
var helpers    = require('./helpers');
var getWeather = require('./getWeather')

// Search Index - first get all campgrounds, then build index
var search;
Campground.find({}, (err, res) => {
 search = new helpers.Searcher(res.slice())
})

// Non-comments routes
router.get('/quote', function(req, res) {
  //send a random quote back
  const randomQuote = helpers.quotes[Math.floor(Math.random() * helpers.quotes.length)]
  res.json([randomQuote]);
});

router.get('/campground', async function(req, res) {
  // requested ID will hold what was requested (either one CG or random CGs)
  var requestedID = [];
  if (req.query.id) {
    requestedID.push(req.query.id);
  } else if (req.query.random) {
    requestedID = helpers.generateRandomCampgroundIds(4);
    console.log('hello');
    console.log(requestedID);
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
      await getWeather.asyncGetWeather(ret.lat, ret.lon)
        .then(data => {
          ret.weather = data.currently;
        })
        .catch(err => console.log("Error in obtaining weather data", err))

      // Send data
      res.json(ret);
  });
});

router.get('/search', function(req, res) {
  res.json(search.doSearch(req.query.q))
});

module.exports = router
