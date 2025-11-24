const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      default: "Default User" },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
);

module.exports = models.User || model("User", UserSchema);
