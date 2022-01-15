const { User, Thoughts } = require("../models");

module.exports = {
  // GET all Thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single Thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtsId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought associated with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // DELETE a Thought
  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtsId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought associated with that ID" })
          : res.json({ message: "Thought has been deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // UPDATE a Thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought associated with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // ADD Reactions to a Thought
  addReactions(req, res) {
    console.log("Testing: Adding Reactions");
    console.log(req.body);
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // REMOVE Reactions from a Thought
  removeReactions(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
