var express = require("express");
var app = express();
var bodyParser = require('body-parser');


// Settings
app.use(bodyParser.json());
app.set("view engine", "ejs");

// TEMPORARY
let campgrounds = [
  {id: 0, name: "Salmon Creek 0", comments: [{id: 0, author: 'Test', time: '12:24', text: 'test comment', rating: 2}, {id: 1, author: 'Test 2', time: '12:24', text: 'test comment 2', rating: 4}], image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg"},
  {id: 1, name: "Salmon Creek 1", comments: [], image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 2, name: "Salmon Creek 2", comments: [], image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 3, name: "Salmon Creek 3", comments: [], image: "https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 4, name: "Salmon Creek 4", comments: [], image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 5, name: "Salmon Creek 5", comments: [], image: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 6, name: "Salmon Creek 6", comments: [], image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 7, name: "Salmon Creek 7", comments: [], image: "https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 8, name: "Salmon Creek 8", comments: [], image: "https://images.pexels.com/photos/176381/pexels-photo-176381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 9, name: "Salmon Creek 9", comments: [], image: "https://images.pexels.com/photos/116104/pexels-photo-116104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 10, name: "Salmon Creek 10", comments: [], image: "https://images.pexels.com/photos/868306/pexels-photo-868306.jpeg"},
  {id: 11, name: "Salmon Creek 11", comments: [], image: "https://images.pexels.com/photos/216676/pexels-photo-216676.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 12, name: "Salmon Creek 12", comments: [], image: "https://images.pexels.com/photos/878251/pexels-photo-878251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 13, name: "Salmon Creek 13", comments: [], image: "https://images.pexels.com/photos/112378/pexels-photo-112378.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 14, name: "Salmon Creek 14", comments: [], image: "https://images.pexels.com/photos/735837/pexels-photo-735837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 15, name: "Salmon Creek 15", comments: [], image: "https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 16, name: "Salmon Creek 16", comments: [], image: "https://images.pexels.com/photos/111362/pexels-photo-111362.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 17, name: "Salmon Creek 17", comments: [], image: "https://images.pexels.com/photos/93858/pexels-photo-93858.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 18, name: "Salmon Creek 18", comments: [], image: "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 19, name: "Salmon Creek 19", comments: [], image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 20, name: "Salmon Creek 20", comments: [], image: "https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
  {id: 21, name: "Salmon Creek 21", comments: [], image: "https://images.freeimages.com/images/large-previews/0e6/campsite-1-1058369.jpg"},
  {id: 22, name: "Salmon Creek 22", comments: [], image: "https://images.freeimages.com/images/large-previews/eb7/mountain-1379228.jpg"}
];
const quotes = [
  "Time camping isn’t time spent, it’s invested",
  "Away is a place where it’s not about the money you spend.It’s about the moments you share",
  "Hike more, worry less",
  "Oh darling, let's be adventurers",
  "I felt my lungs inflate with the onrush of scenery. Air, mountains, tree, people. I thought: this is what it is to be happy",
  "Life begins when you start saying 'Yes'",
  "There is no Wi-fi in the forest, but I promise you will find a better connection",
  "I am most alive among tall trees",
  "Camping is “Home”",
  "Wander often, wander always. because not all who wander are lost",
  "Just GO!",
  "Don’t let your dreams be dreams",
  "There’s no place like camp. I wish I could stay forever",
  "I don’t need Therapy. I just need to go camping",
  "Explore.",
  "The Mountains Are Calling And I Must Go",
  "A Bonfire Is Basically Just A Nightclub In The Mountains",
  "Live Laugh Camp",
  "Be Brave Run Free And Stay Wild",
  "Camping is the answer",
  "Collect memories, not things",
  "Life is better in the woods",
  "Cold Air Dark Night Warm Fire Bright Stars",
  "Camp more, worry less",
  "Of all the paths you can take in life, make sure a few of them are dirt",
  "The forest makes your heart gentle",
  "Adopt the pace of nature: her secret is patience",
  "Adventure is waiting",
  "Born to camp",
  "Nothing adventured, nothing attained",
  "The earth has music for those who listen",
  "Wander without a reason or purpose",
  "Live in the sunshine, swim in the sea, drink the wild air",
  "The poetry of the earth is never dead",
  "I took a walk in the woods and came out taller than the trees",
  "Take only memories, leave only footprints",
  "Camping is nature's way of promoting the motel business",
  "A crude meal, no doubt, but the best of all sauces is hunger.",
  "A great many people, and more all the time, live their entire lives without ever once sleeping out under the stars",
  "The stars were better company anyway. They were very beautiful, and they almost never snored.",
  "“Forget not that the earth delights to feel your bare feet and winds long to play with your hair",
  "Nature gives to every time and season some beauties of its own",
  "Choose only one master – Nature",
  "We do not see nature with our eyes, but with our understandings and our hearts"
];


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

app.listen(3001, function() {
  console.log("Server running on port 3001 (http://localhost:3001).");
});
