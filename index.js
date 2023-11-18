//IMPORTING EVERYTHING
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 3000;
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const connect = require("./db");

//Middlewares
app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(authRoute);

//App Listening
app.listen(port, () => {
  connect();
  console.log(`Backend Server is running ${port}!`);
});
