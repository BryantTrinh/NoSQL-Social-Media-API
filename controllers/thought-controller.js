const { Thought, User } = require('../models');

// Requirements: 
// get all thoughts, 
// get single thought by id, 
// creating a thought, 
// deleting a thought, 
// updating a thought, 
// remove thought id from user's thought field (users don't need to see that), 
// add a reaction to a thought, 
// remove a reaction from a thought, 
// export this controller in the end.

// function to make a call to Thought model, then retrieve all documents in Thought collection. We sort documents by createdAt field, if successful, it returns data in JSON format. createdAt: -1 is telling mongoose that the results should be sorted in descending order based on createdAt field. Most recent document returned first.

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
    .sort({ createdAt: -1 })
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

// single thought by the id assigned, findOne id, by using req.params. if there isn't an id matching that, send 500, if there is, we send the json information

  getSingleThought(req, res) {
    Thought.findOne({_id: req.params.thoughtId })
    .then((dbThoughtData) => {
      if(!dbThoughtData) {
        return res.status(404).json({ 
          message: 'No thoughts match this id.' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
      },

// Create a thought, we start by calling the req.body method to create a new document in the "Thought" collection using the data in the req.body object. Then we go through the normal algorithm of successfully creating  the Thought document, which gets passed back to the callback function as dbthoughtdata. We are trying to find the user associated with userId in the req.body, and update it by pushing the dbthoughtdata._id into the array. Use new: true, so that original document is returned instead of original. 

  createThought(req, res) {
    Thought.create(req.body)
    .then((dbThoughtData) => {
      return User.findOneAndUpdate(
        {_id: req.body.userId },
        { $push: {
          thoughts: dbThoughtData._id } },
          { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({
          message: 'Your thought was created, but there is not a user with this id.' });
        }
        res.json({ message: 'Thought was created!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },


  }


module.exports = thoughtController;