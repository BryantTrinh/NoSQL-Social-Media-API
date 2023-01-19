const userRouter = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// route to root directory and also able to create User

userRouter.route('/').get(getUsers).post(createUser);

// get single user, put- updating a user, delete

userRouter.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// post- add friend and delete- remove friends

userRouter.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = userRouter;