const express = require("express")
const route = express.Router()

const { movies, getNextId } = require("../dados/movies")

route.post("/", (req, res) => {
    let { title, director, year, genre } = req.body

    if (!title || !director|| year === undefined || !genre) {
        return res.status(400).json({error: "Todos os campos são obrigatórios."})
    }

    year = Number(year)

    if (!Number.isInteger(year) || year <= 0) {
        return res.status(400).json({error: "O parâmetro 'year' deve ser um número inteiro válido."})
    }

    const newMovie = {id: getNextId(), title, director, year, genre}

    movies.push(newMovie)
    return res.status(201).json(newMovie)
})
module.exports = route