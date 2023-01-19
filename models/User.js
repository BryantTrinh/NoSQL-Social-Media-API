// Same thing as other models, we require Schema and model for mongoose

const { Schema, model } = require('mongoose');
// requires username, email, thoughts, friends
// for username, add trim:true, so that it removes white spaces from value of the field.
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // for email, we use regex to make it match this pattern for an email.
      match: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref:'User',
      },
    ],
  },
  {
    // set virtual to true so that it can create a virtual property.
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;