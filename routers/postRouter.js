const express = require('express');
const postRouter = express.Router()

postRouter.get('/post', (req, res) => {
    res.json({message: 'Djon hello'})
})

module.exports = postRouter