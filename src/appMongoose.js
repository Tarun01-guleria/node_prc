const { connect } = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.DB_URL;
const DB_NAME = "mern";

const connectDB = async () => {
  try {
    await connect(`${MONGO_URL}/${DB_NAME}`);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

connectDB();
