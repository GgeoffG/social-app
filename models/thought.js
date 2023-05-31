const { Schema, model, Types } = require("mongoose");
const { moment } = require("moment");
const reactionsSchema = require("./reaction");

//Schema for thoughts model

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (value) {
        return moment(value).format("MM/DD hh:mm A");
      },
    },
    username: {
      type: String,
      required: true,
      ref: "user",
    },
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
thoughtsSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});
const Thought = model("thought", thoughtsSchema);

module.exports = Thought;
