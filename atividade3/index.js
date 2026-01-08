const express = require("express")
const app = express()
const port = 3000

const createMovie = require("./funções/createMovie.route")
const listMovies = require("./funções/listMovies.route")
const updateMovie = require("./funções/updateMovie.route")
const deleteMovie = require("./funções/deleteMovie.route")
const searchMovie = require("./funções/searchMovie.route")

app.use(express.json())

app.use("/filmes", createMovie)
app.use("/filmes", listMovies)
app.use("/filmes", updateMovie)
app.use("/filmes", deleteMovie)
app.use("/filmes", searchMovie)

app.listen(port, () => {
    console.log("Servidor rodando na porta 3000")
})