// For mongoose, we require schema and model to structure.

const { Schema, Model } = require('mongoose');

const reactionSchema = require('./Reaction');

const dateFormat = require('../utils/dateFormat');

// we need thoughtText, createdAt, username, and reactions
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: `Please leave a thought.` true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// creating virtual property using .virtual. We are going to name it reactionCount and it is a getter function that returns the length of reactions array on the document. So when we access reactionCount property, it will return the number of items in the reactions array, but the data is not stored in the database. 
// Then we create mongoose model called Thought using the thoughtSchema and we export it. 

thoughtSchema.virtual('reactionCount').get
(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughSchema);

module.exports = Thought;
