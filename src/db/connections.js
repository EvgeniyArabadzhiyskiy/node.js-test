const { MongoClient } = require("mongodb");
const collections = require("./collections");

const connectionMongo = async () => {
  const client = new MongoClient(process.env.MONGO_URL);
  const dbName = "goit";

  await client.connect();
  const db = client.db(dbName);

  collections.Posts = db.collection("contacts");
  // const posts = await collections.Posts.find({}).toArray();
  // console.log("connectionMongo ~ posts", posts);
};

module.exports = { connectionMongo };
