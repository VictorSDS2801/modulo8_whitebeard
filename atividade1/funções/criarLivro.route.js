const express = require("express")
const route = express.Router()

const { books, getNextId } = require("../dados/books")

route.post("/", (req, res) => {
    let { title, author, year, genre } = req.body

    if (title === undefined || author === undefined || year === undefined || genre === undefined) {
        return res.status(400).json({error: "Todos os campos são obrigatórios."})
    }

    year = Number(year)

    if (!Number.isInteger(year) || year <= 0) {
        return res.status(400).json({error: "O parâmetro 'year' deve ser um número inteiro válido."})
    }

    const newBook = {id: getNextId(), title, author, year, genre}

    books.push(newBook)

    return res.status(201).json(newBook)
})
module.exports = route