const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  updateThought,
  addReactions,
  removeReactions,
} = require("../../controllers/thoughtsController");

// /api/thoughts
// GET all Thoughts & CREATE Thought
// Associate this with a specific user
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId
//GET single Thought & UPDATE Thought & DELETE Thought
router
  .route("/:thoughtsId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtsId/reactions
//ADD Reactions to Thought & REMOVE Reactions from Thought
router
  .route("/thoughts/:thoughtsId/reactions")
  .post(addReactions)
  .delete(removeReactions);

module.exports = router;
