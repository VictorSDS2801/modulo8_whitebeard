const express = require("express")
const app = express()
const port = 3000

const criarLivro = require("./funções/criarLivro.route")
const listarLivros = require("./funções/listarLivros.route")
const atualizarLivro = require("./funções/atualizarLivro.route")
const deletarLivro = require("./funções/deleteLivro.route")
const buscarLivros = require("./funções/buscarLivros.route")

app.use(express.json())

app.use("/livros", criarLivro)
app.use("/livros", listarLivros)
app.use("/livros", atualizarLivro)
app.use("/livros", deletarLivro)
app.use("/livros", buscarLivros)

app.listen(port, () => {
    console.log("Servidor rodando na porta 3000")
})