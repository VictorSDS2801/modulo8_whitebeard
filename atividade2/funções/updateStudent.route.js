const express = require("express")
const route = express.Router()

const { students } = require("../dados/students")
route.put("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "ID inválido."})
    }

    const student = students.find(s => s.id === id)

    if (!student) {
        return res.status(404).json({error: "Estudante não encontrado."})
    }

    let { name, registration, course, year } = req.body

    if (year !== undefined) {
        year = Number(year)

        if (!Number.isInteger(year) || year <= 0 ) {
            return res.status(400).json({error: "O parâmetro 'year' deve ser um número inteiro válido."})
        }

        student.year = year

    }

    if (registration !== undefined) {
        registration = Number(registration)

        if (!Number.isInteger(registration) || registration <= 0) {
            return res.status(400).json({error: "O parâmetro 'registration' deve ser um número inteiro válido."})
        }

        student.registration = registration
    }

    if (name !== undefined) student.name = name
    if (course !== undefined) student.course = course

    return res.status(200).json(student)
})
module.exports = route