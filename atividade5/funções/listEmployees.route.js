const express = require("express")
const route = express.Router()

const { employees } = require("../dados/employees")

route.get("/", (req, res) => {
    return res.status(200).send(employees)
})
module.exports = route