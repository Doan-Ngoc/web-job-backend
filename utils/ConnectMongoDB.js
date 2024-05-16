const mongoose = require("mongoose");
const { environmentConfig } = require("@configs");

module.exports = async function () {
  await mongoose.connect(
    "mongodb+srv://user123:mindx@cluster0.43l0vn2.mongodb.net/jobsConnect",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Connected to MongoDB");
};
