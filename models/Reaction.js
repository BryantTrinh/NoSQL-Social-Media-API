// Add Schema and types into const, we are structuring our reaction schema by doing so

const { Schema, Types } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

// required for schema is reactionID, reactionBody, username, createdAt
const Reaction = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  // mongoose document converted to plain javascript object. Getters: true for when document is converted to plain js object, getters will be applied. we are not including id, so id:false.
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = Reaction;