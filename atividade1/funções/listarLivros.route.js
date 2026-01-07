const express = require("express")
const route = express.Router()

const { books } = require("../dados/books")

route.get("/", (req, res) => {
    res.status(200).send(books)
})
module.exports = route