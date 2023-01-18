const { User, Thought } = require('../models');

// requirements:
// get all users 
// get single user by id 
// create new user 
// update a user 
// delete user and their thoughts
// add friend to friends list 
// remove friend from list 

const userController = {

// retrieving list of all User documents from Mongo, in this, we should get all documents from user collection first. .select('-__v)' method exclused _v field from returned document, this is Mongo's internal version key and it's not needed in our case. 
  getUsers(req, res) {
    User.find()
    .select('-__v')
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

// get one user by id

  getSingleUser(req, res) {
    User.findOne({_id:req.params.userId })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then((dbUserData) => {
      if (!dbUserData) {
      return res.status(404).json({
        message: 'No user associated with this id.' });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

// create a new user

  createUser(req, res) {

  }

