const express = require("express")
const route = express.Router()

const { movies } = require("../dados/movies")

route.get("/busca", (req, res) => {
    let { title, director, year, genre } = req.query

    let result = movies

    if (title !== undefined) {
        result = result.filter(m => m.title.toLowerCase().includes(title.toLowerCase()))
    }

    if (year !== undefined) {
        year = Number(year)

        if (!Number.isInteger(year)) {
            return res.status(400).json({error: "O campo 'year' deve ser um número."})
        }

        result = result.filter(m => m.year === year)
    }

    if (director !== undefined) {
        result = result.filter(m => m.director.toLowerCase().includes(director.toLowerCase()))
    }
    if (genre !== undefined) {
        result = result.filter(m => m.genre.toLowerCase().includes(genre.toLowerCase()))
    }

    return res.status(200).json(result)
})
module.exports = route