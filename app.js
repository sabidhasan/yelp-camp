var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser');
    path            = require('path');

var commentsRoutes  = require('./custom-modules/routes_comments'),
    otherRoutes     = require('./custom-modules/routes_other')

// Allow parsing body from post requests
app.use(bodyParser.json());

// Import the routes
app.use(commentsRoutes);
app.use(otherRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Fallback route (404)
// app.use(function(req, res) {
//   res.sendStatus(404);
// });

// Start backend server
app.listen(8090, function() {
  console.log("Server running on port 8090 (http://localhost:8090).");
});
