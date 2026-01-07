const express = require("express")
const route = express.Router()

const { books } = require("../dados/books")

route.get("/busca", (req, res) => {
    let {title, author, year, genre} = req.query

    let result = books

    if (title !== undefined) {
        result = result.filter(b => b.title.toLowerCase().includes(title.toLowerCase()))
    }

    if (author !== undefined) {
        result = result.filter(b => b.author.toLowerCase().includes(author.toLowerCase()))
    }

    if (year !== undefined) {
        year = Number(year)

        if (!Number.isInteger(year)) {
            return res.status(400).json({error: "O campo 'year' deve ser um número."})
        }

        result = result.filter(b => b.year === year)
    }

    if (genre !== undefined) {
        result = result.filter(b => b.genre.toLowerCase().includes(genre.toLowerCase()))
    }

    return res.status(200).json(result)
})
module.exports = route