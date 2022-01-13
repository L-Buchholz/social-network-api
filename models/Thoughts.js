/*
NEED FOR ASSIGNMENT: 

thoughtText

- String
- Required
- Must be between 1 and 280 characters

createdAt
- Date
- Set default value to the current timestamp
- Use a getter method to format the timestamp on query

username (The user that created this thought)
- String
- Required

reactions (These are like replies -- SEE BELOW)
- Array of nested documents created with the reactionSchema

**Schema Settings:**
Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

*
*

Reaction (SCHEMA ONLY)

reactionId
- Use Mongoose's ObjectId data type
- Default value is set to a new ObjectId

reactionBody
- String
- Required
- 280 character maximum

username
- String
- Required

createdAt
- Date
- Set default value to the current timestamp
- Use a getter method to format the timestamp on query

**Schema Settings:**
This will not be a separate model, but rather will be used as the reaction field's subdocument schema in the Thought model.

*/

//
//
//
// PRIOR CODE:

const { Schema, model } = require("mongoose");

// Schema to create a course model
const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    inPerson: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },
    endDate: {
      type: Date,
      // Sets a default value of 12 weeks from now
      default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Course = model("course", courseSchema);

module.exports = Course;
