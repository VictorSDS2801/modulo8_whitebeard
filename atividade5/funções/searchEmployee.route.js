const express = require("express")
const route = express.Router()
const { employees } = require("../dados/employees")

route.get("/busca", (req, res) => {
    let {name, position, department, salary} = req.body

    let result = employees

    if (name !== undefined) {
        result = result.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    }

    if (position !== undefined) {
        result = result.filter(e => e.position.toLowerCase().includes(position.toLowerCase()))
    }

    if (department !== undefined) {
        result = result.filter(e => e.department.toLowerCase().includes(department.toLowerCase()))
    }

    if (salary !== undefined) {
        salary = Number(salary)

        if (isNaN(salary) || salary <= 0) {
            return res.status(400).json({error: "O campo 'salary' deve ser um número."})
        }

        result = result.filter(e => e.salary === salary)
    }


    return res.status(200).json(result)
})
module.exports = route