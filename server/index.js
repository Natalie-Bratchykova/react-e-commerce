require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
const path = require("path");
const PORT = process.env.PORT || 2121;
const models = require("./models/models");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");

const app = express();
app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use("/api", router);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server works on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
