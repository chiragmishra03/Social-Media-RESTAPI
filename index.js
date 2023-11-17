//IMPORTING EVERYTHING
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { default: helmet } = require("helmet");

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
// const connect = require("./db");
// connect();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(userRoute);
app.use(authRoute);

//App Listening
app.listen(port, () => {
  const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to db");
    } catch (error) {
      console.log(error);
    }
  };
  connect();
  console.log(`Backend Server is running ${port}!`);
});
