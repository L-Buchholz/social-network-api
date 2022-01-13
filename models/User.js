const { Schema, model, Mongoose } = require("mongoose");
const thoughtsSchema = require("./Thoughts");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      //required: true -- Below
      unique: true,
      validate: {
        validator: function(v) {
          return `/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/`.test(v);
        }
        //Error message -- syntax?
        message: email => `${email.value} is not a valid email address`
      },
      required: [true, "Email required"]
        },
    // Array of _id values referencing the Thought model
    thoughts: [thoughtsSchema],
    /* *Self-referential* array of _id values referencing the User model
    -- check syntax */
    friends: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // Is this needed?
    id: false,
  }
);

// Create a virtual property `friendCount` that retrieves the length of the user's friends array field on query
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    // Check syntax -- array
    return `${this.friends}`.length;
  });

const User = model("user", userSchema);

module.exports = User;
