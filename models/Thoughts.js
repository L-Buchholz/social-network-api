const { Schema, model, Mongoose, ObjectId } = require("mongoose");

const reactionSchema = new Schema(
  {
    // This is referenced in the const above
    reactionId: ObjectId,
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      // Use a getter method to format the timestamp on query
      date: { type: Date, default: Date.now },
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      // Must be btwn 1 and 280 chars
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      // Use a getter method to format the timestamp on query
      date: { type: Date, default: Date.now },
    },
    username: {
      type: String,
      required: true,
    },
    // Array of nested documents created with the reactionSchema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
thoughtsSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
