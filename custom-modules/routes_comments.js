var express    = require("express");
var router     = express.Router();
var Campground = require('./db_models');
var helpers    = require('./helpers');

const validateUser = async (res, req, next) => {
  // Validate the user based on supplied credentials
  try {
    var verification = await helpers.verifyUser(req.body.userID);
    return verification;
  } catch (err) {
    // Couldn't verify users JWT token, or no token was given in req.body.userID
    return false;
  }
}

router.delete('/comment', async function(req, res) {
  const verification = await validateUser(res, req);
  if (!verification) {
    return res.sendStatus(400);
  }

  // verify comment is owned by user
  Campground.find({'id': req.body.campgroundID}, (error, result) => {
    // Check for how many campgrounds were found
    if (result.length !== 1 || error) {
      console.log(error || 'Campground not valid');
      return res.send(400);
      // return;
    }
    // oldCommentsArray = result[0].comments
    var oldCommentIdx = result[0].comments.findIndex(val => req.body.commentID === val.id)
    if (oldCommentIdx === -1 || result[0].comments[oldCommentIdx].uid !== verification) {
      // couldn't find comment, or user verification doenst match - send error
      console.log('error occurred');
      return res.sendStatus(401);
      // return;
    }
    // Delete comment
    result[0].comments.splice(oldCommentIdx, 1);
    Campground.update({'id': req.body.campgroundID}, {$set: {'comments': result[0].comments}}, function(e) {
      if (e) {
        console.log(e);
        return res.sendStatus(401);
        // return;
      }
      console.log(result[0].comments);
      res.json(result[0].comments.reverse());
    });
  });
});

router.post('/comment', async function(req, res) {
  if (!await validateUser(res, req)) {
    return res.sendStatus(400);
  }
  // Ensure rating and text are valid
  if (req.body.pickedRating > 5 || req.body.pickedRating < 0) {
    return res.sendStatus(400);
    // return;
  }
  if (!req.body.reviewText || req.body.reviewText.length < 15) {
    return res.sendStatus(400);
    // return;
  }

  // TO--DO check for spam, check for same review twice

  // validate campgroundID, inject into DB
  const cgID = {'id': req.body.campgroundID};
  Campground.find(cgID, (error, result) => {
    // Check for how many campgrounds were found
    if (result.length !== 1 || error) {
      return res.send(400);
      // return;
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
        return res.json(400);
        // return;
      }
      res.json(newReview);
    })
  });
});

module.exports = router;
