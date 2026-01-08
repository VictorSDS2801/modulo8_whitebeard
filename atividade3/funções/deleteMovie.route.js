const express = require("express")
const route = express.Router()
const { movies } = require("../dados/movies")

route.delete("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "ID inválido"})
    }

    const index = movies.findIndex(m => m.id === id)

    if (index === -1) {
        return res.status(404).json({error: "Filme não encontrado."})
    }

    const remove = movies.splice(index, 1)
    return res.status(200).json({message: "Livro removido com sucesso.", movie: remove[0]})
})
module.exports = route