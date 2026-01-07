const express = require("express")
const route = express.Router()

const { books } = require("../dados/books")

route.put("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "ID inválido" })
    }

    const book = books.find(b => b.id === id)

    if (!book) {
        return res.status(404).json({error: "Livro não encontrado."})
    }

    let { title, author, year, genre } = req.body

    if (year !== undefined) {
        year = Number(year)

        if (!Number.isTinteger(year) || year <= 0) {
            return res.status(400).json({error: "O parâmetro 'year' deve ser um número inteiro válido."})
        }

        book.year = year
    }

    if (title !== undefined) book.title = title
    if (author !== undefined) book.author = author
    if (genre !== undefined) book.genre = genre

    return res.status(200).json(book)
})
module.exports = route