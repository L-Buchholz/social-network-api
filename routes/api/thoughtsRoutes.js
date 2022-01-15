const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
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
//ADD Reactions to Thought
router.route("/thoughts/:thoughtsId/reactions").put(addReactions);

// /api/thoughts/:thoughtsId/reactions
//REMOVE Reactions from Thought
router.route("/thoughts/:thoughtsId/:reactionsId").delete(removeReactions);

module.exports = router;
