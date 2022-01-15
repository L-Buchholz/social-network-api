const { User, Thoughts } = require("../models");

// Aggregate function to get the total number of Users
// totalUsers
const totalUsers = async () =>
  User.aggregate()
    .count("totalUsers")
    .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting User Thoughts -- MAY NOT BE NECESSARY:
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

// Aggregate function for getting user Friends -- MAY NOT BE NECESSARY:
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
  // GET a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ user })
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
  // UPDATE a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user associated with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE a User and remove them from the DB
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID exists" })
          : res.json({ message: "User successfully deleted" })
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
