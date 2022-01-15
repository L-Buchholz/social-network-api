const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addThoughts,
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
// ADD Thoughts to User
router.route("/:userId/thoughts/").put(addThoughts);

// /api/users/:userId/friends/
//ADD Friends to User
router.route("/:userId/friends/").put(addFriends);

// /api/users/:userId/friends/:friendId
// REMOVE Friends from User
router.route("/:userId/friends/:friendsId").delete(removeFriends);

module.exports = router;
