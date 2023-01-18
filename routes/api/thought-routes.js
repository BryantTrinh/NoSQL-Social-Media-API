const router = require('express').Router();

// get all thoughts, get a single thought by id, createthought, updatethought, deletethought, addreaction, removereaction

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require ('../../controllers/thought-controller');

// route for root URL of our app, then we map two methods to two different functions of getThoughts and createThought. when we do a GET, getthoughts will be executed, on POST, to root url, createThought is executed.

router.route('/').get(getThoughts).post(createThought);

// mapping three different methods of get, put, delete. same logic as the previous comment.

router.route('/:thoughtId').get(getSingleThrought).put(updateThought).delete(deleteThought);

// add reaction on post
router.route('/:thoughtId/reactions').post(addReaction);

// delete/ remove reaction.
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;