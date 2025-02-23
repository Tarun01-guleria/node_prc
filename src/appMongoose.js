const { connect } = require("mongoose");

const MONGO_URL = "mongodb+srv://node123:node123@cluster0.wyxix.mongodb.net";
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
