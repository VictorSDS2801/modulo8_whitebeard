const express = require("express")
const route = express.Router()

const { books } = require("../dados/books")

route.delete("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "ID Inválido"})
    }

    const index = books.findIndex(b => b.id === id)

    if (index === -1) {
        return res.status(404).json({error: "Livro não encontrado."})
    }

    const removido = books.splice(index, 1)
    return res.status(200).json({message: "Livro removido com sucesso!", book: removido[0]})
})
module.exports = route