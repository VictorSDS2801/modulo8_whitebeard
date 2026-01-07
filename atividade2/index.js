const express = require("express")
const app = express()
const port = 3000

const createStudent = require("./funções/createStudent.route")
const listStudents = require("./funções/listStudents.route")
const updateStudent = require("./funções/updateStudent.route")
const deleteStudent = require("./funções/deleteStudent.route")
const searchStudent = require("./funções/searchStudent.route")

app.use(express.json())

app.use("/estudantes", createStudent)
app.use("/estudantes", listStudents)
app.use("/estudantes", updateStudent)
app.use("/estudantes", deleteStudent)
app.use("/estudantes", searchStudent)

app.listen(port, () => {
    console.log("Servidor rodando na porta 3000")
})
