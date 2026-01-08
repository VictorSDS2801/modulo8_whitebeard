const express = require("express")
const route = express.Router()
const { employees } = require("../dados/employees")

route.delete("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "ID inválido"})
    }

    const index = employees.findIndex(e => e.id === id)

    if (index === -1) {
        return res.status(404).json({error: "Funcionário não encontrado"})
    }

    const remove = employees.splice(index, 1)
    return res.status(200).json({message: "Funcionário removido com sucesso", employee: remove[0]})
})
module.exports = route