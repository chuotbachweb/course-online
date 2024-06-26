const mongoose = require("mongoose");

// connect database in Mongo
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failure");
  }
}

module.exports = { connect };
