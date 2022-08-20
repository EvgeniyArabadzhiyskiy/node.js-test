const express = require("express");

const routeBooks = express.Router();

routeBooks
.get("/books", (req, res) => {
res.json({ books: ["Djon First Book"] });
})

.get("/books1", (req, res) => {
res.json({ books: [" Second Book"] });
})

.post("/books/1", (req, res) => {
res.json({ books: req.body });
});

module.exports = { routeBooks };
