const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addThoughts,
  removeThoughts,
  addFriends,
  removeFriends,
} = require("../../controllers/userController.js");

// /api/users
// GET all Users & CREATE User
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
//GET single User & UPDATE User & DELETE User
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/thoughts/:thoughtId
// NOT REQUIRED: ADD Thoughts to User & REMOVE Thoughts from User
router
  .route("/:userId/thoughts/:thoughtsId")
  .put(addThoughts)
  .delete(removeThoughts);

// /api/users/:userId/friends/:friendId
//ADD Friends to User & REMOVE Friends from User

router
  .route("/:userId/friends/:friendsId")
  .put(addFriends)
  .delete(removeFriends);

module.exports = router;
