var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    helpers         = require('./custom-modules/helpers');
    Campground      = require('./custom-modules/db_models')

var commentsRoutes  = require('./custom-modules/routes_comments'),
    otherRoutes     = require('./custom-modules/routes_other')

// Allow parsing body from post requests
app.use(bodyParser.json());

// Import the routes
app.use(commentsRoutes);
app.use(otherRoutes);

app.use(function(req, res) {
  res.sendStatus(404);
})
app.listen(3001, function() {
  console.log("Server running on port 3001 (http://localhost:3001).");
});
