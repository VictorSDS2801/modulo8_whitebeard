const express = require("express")
const route = express.Router()

const { employees, getNextId } = require("../dados/employees")

route.post("/", (req, res) => {
    let { name, position, department, salary} = req.body

    if (!name || !position || !department || salary === undefined) {
        return res.status(400).json({error: "Todos os campos são obrigatórios"})
    }

    salary = Number(salary)

    if (isNaN(salary) || salary <= 0) {
        return res.status(400).json({error: "O parâmetro 'salary' deve ser um número válido."})
    }

    const newEmployee = {id: getNextId(), name, position, department, salary}

    employees.push(newEmployee)

    return res.status(201).json(newEmployee)
})
module.exports = route