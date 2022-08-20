const express = require("express");
const fs = require("fs/promises");
const axios = require("axios");
require('dotenv').config()
const { routeBooks } = require("./booksRoute");
const { routerWeather } = require("./weatherRoute");

const PORT = process.env.PORT
const app = express();

const BASE_URL =
  "https://62e65af1de23e263792af968.mockapi.io/api/stars-numbers/contacts";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routeBooks);
app.use("/api", routeBooks);
app.use(routerWeather);

app.get("/template", async (req, response) => {
  const data = await fs.readFile("./index.html", "utf-8");
  return response.end(data);
});

app.get("/base", async (req, response) => {
  const { data } = await axios.get(`${BASE_URL}`);
  console.log("app.put ~ data", data);

  response.json(data);
});

app.get("/base/:id", async (req, response) => {
  // console.log("params req", req.params.id);

  const { data } = await axios.get(`${BASE_URL}/${req.params.id}`);
  // console.log("app.put ~ data", data);

  response.json(data);
});

app.post("/home", async (req, response) => {
  console.log("app.get ~ req.body", req.body.goit);

  if (!req.body.goit) {
    return response.status(400).json({ status: "GOIT Requered" });
  }
  response.json({ nikName: "Mango", body: req.body });
});

app.put("/base/:id", async (req, response) => {
  console.log("params req", req.params.id);
  console.log("app.get ~ req.body", req.body);

  const { data } = await axios.put(`${BASE_URL}/${req.params.id}`, req.body);
  console.log("app.put ~ data", data);

  response.json(data);
});

app.use((req, response) => {
  response.send("ERROR");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server run on port ${PORT}`);
});

// console.log("hello  ");



// npx nodemon server.js

// API_KEY = ea41bc3d393b41638cdd827b88acf3ef
