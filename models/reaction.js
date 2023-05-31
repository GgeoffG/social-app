const { Schema, model } = require("mongoose");

//Schema for reaction

const reactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (value) {
        return moment(value).format("MM/DD hh:mm A");
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionsSchema;
