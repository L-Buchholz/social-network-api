const { User, Thoughts } = require("../models");

// Aggregate function to get the total number of Users
// totalUsers
const totalUsers = async () =>
  User.aggregate()
    .count("totalUsers")
    .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting User Thoughts
// userThoughts
const userThoughts = async (usernameId) =>
  User.aggregate([
    {
      $unwind: "$thoughts",
    },
    {
      $group: { _id: usernameId, thoughts: { $_id: "$thoughts.thoughtsId" } },
    },
  ]);

// Aggregate function for getting user Friends
// userFriends
const userFriends = async (usernameId) =>
  User.aggregate([
    {
      $unwind: "$friends",
    },
    {
      $group: { _id: usernameId, friends: { $_id: "$user.friends" } },
    },
  ]);

// Modules for data routes
module.exports = {
  // GET all Users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          totalUsers: await totalUsers(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET a single User AND their Thoughts AND Friends (L's note: Separate these?)
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
              email: await req.params.email,
              thoughts: await userThoughts,
              friends: await userFriends,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // CREATE a new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // DELETE a User and remove them from the DB
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID exists" })
          : Thoughts.findOneAndUpdate(
              { username: req.params.userId },
              { $pull: { username: req.params.userId } },
              { new: true }
            )
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: "User deleted, but no associated thoughts found",
            })
          : res.json({ message: "Thoughts successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // ADD Thoughts to a User
  addThoughts(req, res) {
    console.log("Testing: Adding user thoughts");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // REMOVE Thoughts from a User
  removeThoughts(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thoughts: { thoughtsId: req.params.thoughtsId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // ADD Friends to a User
  addFriends(req, res) {
    console.log("Testing: Adding user Friends");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // REMOVE Friends from a User
  removeFriends(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendsId: req.params.userId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
