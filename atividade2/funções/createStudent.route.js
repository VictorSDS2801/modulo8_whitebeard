const express = require("express")
const route = express.Router()

const { students, getNextId } = require("../dados/students")

route.post("/", (req, res) => {
    let { name, registration, course, year } = req.body

    if (name === undefined || registration === undefined || course === undefined || year === undefined) {
        return res.status(400).json({error: "Todos os campos são obrigatórios."})
    }

    year = Number(year)
    registration = Number(registration)

    if (!Number.isInteger(year) || !Number.isInteger(registration) || year <= 0 || registration <= 0) {
        return res.status(400).json({error: "O parâmetro 'year' e o parâmetro 'registration' devem ser números válidos."})
    }

    const newStudent = {id: getNextId(), name, registration, course, year}

    students.push(newStudent)
    return res.status(201).json(newStudent)
})
module.exports = route