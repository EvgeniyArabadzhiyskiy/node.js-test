const mongoose = require("mongoose");

const connectionMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("Mongooose start");
};

module.exports = { connectionMongo };




// const { MongoClient } = require("mongodb");
// const collections = require("./collections");

// const connectionMongo = async () => {
//   const client = new MongoClient(process.env.MONGO_URL);
//   const dbName = "goit";

//   await client.connect();
//   const db = client.db(dbName);

//   collections.Posts = db.collection("contacts");
// };

// module.exports = { connectionMongo };