const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: [
      "Accept-Version",
      "Authorization",
      "Credentials",
      "Content-Type",
    ],
  })
);
app.options("*", cors());

app.disable("x-powered-by");

const uri = process.env.ATLAS_URI;
// Connection to mongodb database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection has been established");
});

const slotsRouter = require("./routes/slots");
const usersRouter = require("./routes/users");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/slots", slotsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
