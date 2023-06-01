const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.find({ _id: req.params.thoughtId }).select(
        "-__v"
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.json({ thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async postThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const userid = thought.userId;
      await User.findOneAndUpdate(
        { _id: userid },
        { $push: { thoughts: thought._id } }
      );
      res.status(200).json({ thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "Thought not Found" });
      }
      res.json({ message: "Thought deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not Found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not Found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
