const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const client = new MongoClient(process.env.DB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function createConnection() {
  try {
    mongoose.connect(process.env.DB, {}, () => console.log("DB connected"));
  } catch (err) {
    console.error(err);
  }
}

module.exports = createConnection;
