require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const PORT = process.env.PORT || 2121;

const app = express();
app.use(express.json());

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server works on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
