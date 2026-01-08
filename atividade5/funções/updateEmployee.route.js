const express = require("express")
const route = express.Router()
const { employees } = require("../dados/employees")

route.put("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "ID inválido"})
    }

    const employee = employees.find(e => e.id === id)

    if (!employee) {
        return res.status(404).json({error: "Funcionário não encontrado"})
    }

    let { name, position, department, salary } = req.body

    if (salary !== undefined) {
        salary = Number(salary)

        if (isNaN(salary) || salary <= 0) {
            return res.status(400).json({error: "O parâmetro 'salary' deve ser um número válido"})
        }

        employee.salary = salary
    }

    if (name !== undefined) employee.name = name
    if (position !== undefined) employee.position = position
    if (department !== undefined) employee.department = department

    return res.status(200).json(employee)
})
module.exports = route