const express = require("express")
const route = express.Router()

const { students } = require("../dados/students")

route.delete("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "ID inválido"})
    }

    const index = students.findIndex(s => s.id === id)

    if (index === -1) {
        return res.status(404).json({error: "Estudante não encontrado."})
    }

    const remove = students.splice(index, 1)
    return res.status(200).json({message: "Estudante removido com sucesso!", student: remove[0]})
})
module.exports = route