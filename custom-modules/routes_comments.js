var express    = require("express");
var router     = express.Router();
var Campground = require('./db_models');
var helpers    = require('./helpers');

const validateUser = async (res, req, next) => {
  // Validate the user based on supplied credentials
  try {
    var verification = await helpers.verifyUser(req.body.userID);
    next();
  } catch (err) {
    // Couldn't verify users JWT token, or no token was given in req.body.userID
    console.log(err);
    res.sendStatus(401);
  }
}

router.delete('/comment', validateUser, async function(req, res) {
  // verify comment is owned by user
  Campground.find({'id': req.body.campgroundID}, (error, result) => {
    // Check for how many campgrounds were found
    if (result.length !== 1 || error) {
      console.log(error || 'Campground not valid');
      res.send(400);
      return;
    }
    // oldCommentsArray = result[0].comments
    var oldCommentIdx = result[0].comments.findIndex(val => req.body.commentID === val.id)
    if (oldCommentIdx === -1 || result[0].comments[oldCommentIdx].uid !== verification) {
      // couldn't find comment, or user verification doenst match - send error
      console.log('error occurred');
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

router.post('/comment', validateUser, async function(req, res) {
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

module.exports = router;
