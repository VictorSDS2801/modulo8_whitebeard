const express = require("express")
const route = express.Router()
const { students } = require("../dados/students")

route.get("/", (req, res) => {
    return res.status(200).send(students)
})
module.exports = route