const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// route to root and also able to create User

router.route('/').get(getUsers).post(createUser);

// get single user, put- updating a user, delete

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// post- add friend and delete- remove friends

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;