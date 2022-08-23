const express = require('express');
const {contactsRoutes} = require('./routes/contacts');

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use


app.listen(PORT)