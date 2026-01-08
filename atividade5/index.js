const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

const createEmployee = require("./funções/createEmployee.route")
const listEmployees = require("./funções/listEmployees.route")
const updateEmployee = require("./funções/updateEmployee.route")
const deleteEmployee = require("./funções/deleteEmployee.route")
const searchEmployee = require("./funções/searchEmployee.route")

app.use("/funcionarios", createEmployee)
app.use("/funcionarios", listEmployees)
app.use("/funcionarios", updateEmployee)
app.use("/funcionarios", deleteEmployee)
app.use("/funcionarios", searchEmployee)


app.listen(port, () => {
    console.log("Servidor rodando na porta 3000")
})