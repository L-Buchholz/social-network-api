const { Schema, model, Mongoose } = require("mongoose");
const userSchema = require("./User");

const reactionSchema = new Schema(
  {
    reactionId: {
      //Use Mongoose's ObjectId data type; default value is set to a new ObjectId
      type: {
        type: new Mongoose.Types.ObjectId(),
      },
    },
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
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
userSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    // Check syntax -- array
    return `${this.reactions}`.length;
  });

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
