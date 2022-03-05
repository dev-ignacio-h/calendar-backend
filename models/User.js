const { Schema, model } = require("mongoose");

const User = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// User.method("toJSON", function () {
//   const { _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

module.exports = model("User", User);
