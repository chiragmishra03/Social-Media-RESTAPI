const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
