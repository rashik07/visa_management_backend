const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const { ObjectId } = mongoose.Schema.Types;

const passportInfoSchema = new mongoose.Schema({
  name: String,
  passport: String,

  image: String,
});

//   passportInfoSchema.index({ productId: 1, userId: 1 }, { unique: true });

const PassportInfo = mongoose.model("PassportInfo", passportInfoSchema);
// console.log(User)

module.exports = PassportInfo;
