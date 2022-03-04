const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("Initialization db error");
  }
};

module.exports = { dbConnection };
