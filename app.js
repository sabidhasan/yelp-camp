var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser');

var commentsRoutes  = require('./custom-modules/routes_comments'),
    otherRoutes     = require('./custom-modules/routes_other')

// Allow parsing body from post requests
app.use(bodyParser.json());

// Import the routes
app.use(commentsRoutes);
app.use(otherRoutes);

// Fallback route (404)
app.use(function(req, res) {
  res.sendStatus(404);
});

// Start backend server
app.listen(3001, function() {
  console.log("Server running on port 3001 (http://localhost:3001).");
});
