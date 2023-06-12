const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URI = process.env.MONGODB_CONNECTION_STRING
const connect = () => {
  mongoose.connect(URI, () => {
    console.log("Db Connect ho gya bhayaji !!");
  });
};
module.exports = connect;