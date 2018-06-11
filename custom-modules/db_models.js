var mongoose = require("mongoose");

// Connect to MONGODB, and define schemas
mongoose.connect('mongodb://localhost/yelp_camp')

var campgroundSchema = new mongoose.Schema({
  name: String, province: String, lat: Number, lon: Number,
  sites: Number, image: [String], email: String, address: String,
  comments: [], paymentMethods: [], region: String, type: String,
  id: Number, description: String, phone: String,
  activities: [],
  hours: {seasonal: [String], daily: String},
  prices: {seasonal: [String], daily: [String], weekly: [String]}
});
const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
