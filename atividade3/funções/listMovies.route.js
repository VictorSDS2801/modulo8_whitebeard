const express = require("express")
const route = express.Router()
const { movies } = require("../dados/movies")

route.get("/", (req, res) => {
    return res.status(200).send(movies)
})
module.exports = route