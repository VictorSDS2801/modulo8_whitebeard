const express = require("express")
const route = express.Router()
const { students } = require("../dados/students")

route.get("/busca", (req, res) => {
    let { name, registration, course, year } = req.query

    let result = students

    if (name !== undefined) {
        result = result.filter(s => s.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (registration !== undefined) {
        registration = Number(registration)

        if (!Number.isInteger(registration)) {
            return res.status(400).json({error: "O campo 'year' deve ser um número."})
        }

        result = result.filter(s => s.registration === registration)
    }
    if (year !== undefined) {
        year = Number(year)

        if (!Number.isInteger(year)) {
            return res.status(400).json({error: "O campo 'registration' deve ser um número."})
        }

        result = result.filter(s => s.year === year)
    }
    if (course !== undefined) {
        result = result.filter(s => s.course.toLowerCase().includes(course.toLowerCase()))
    }
    

    return res.status(200).json(result)
})
module.exports = route