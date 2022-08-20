const axios = require("axios");
const express = require("express");
const postRouter = require("./routers/postRouter");
const { routerWeather } = require("./routers/weatherRoute");
require("dotenv").config();



const PORT = process.env.PORT;
const app = express();

// const BASE_URL =
//   "https://62e65af1de23e263792af968.mockapi.io/api/stars-numbers/contacts";

app.use(express.json());
app.use(express.static("public"));
app.use(routerWeather);
app.use(postRouter)







app.use((req, response) => {
  response.send("ERROR");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server run on port ${PORT}`);
});

console.log("hello  ");

// npx nodemon server.js


