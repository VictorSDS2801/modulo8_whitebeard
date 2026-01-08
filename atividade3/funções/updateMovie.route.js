const express = require("express")
const route = express.Router()
const { movies } = require("../dados/movies")

route.put("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "ID inválido"})
    }

    const movie = movies.find(m => m.id === id)

    if (!movie) {
        return res.status(404).json({error: "Filme não encontrado."})
    }

    let { title, director, year, genre } = req.body

    if (year !== undefined) {
        year = Number(year)

        if (!Number.isInteger(year) || year <= 0) {
            return res.status(400).json({error: "O parâmetro 'year' deve ser um número inteiro válido."})
        }

        movie.year = year
    }

    if (title !== undefined) movie.title = title
    if (director !== undefined) movie.director = director
    if (genre !== undefined) movie.genre = genre

    return res.status(200).json(movie)
})
module.exports = route
