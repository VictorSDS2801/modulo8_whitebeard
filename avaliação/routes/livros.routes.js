const express = require("express")
const router = express.Router()
const { livros, criarLivro } = require("../dados/livros")

router.post("/livro", (req, res) => {
    const { titulo, autor, ano, genero } = req.body

    if (!titulo || !autor || ano === undefined || !genero) {
        return res.status(400).json({ error: "Dados inválidos" })
    }

    const anoNum = Number(ano)

    if (!Number.isInteger(anoNum) || anoNum <= 0) {
        return res.status(400).json({error: "O atributo 'ano' deve ser um número inteiro maior que zero"})
    }

    const livro = criarLivro(titulo, autor, anoNum, genero)
    res.status(201).json(livro)
})

router.get("/livro", (req, res) => {
    let resultado = livros
    const { titulo, autor, ano, genero } = req.query

    if (titulo) {
        resultado = resultado.filter(l =>l.titulo.toLowerCase().includes(titulo.toLowerCase()))
    }

    if (autor) {
        resultado = resultado.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()))
    }

    if (ano !== undefined) {
        const anoNum = Number(ano)

        if (!Number.isInteger(anoNum) || anoNum <= 0) {
            return res.status(400).json({error: "O atributo 'ano' deve ser um número inteiro maior que zero"})
        }

        resultado = resultado.filter(l => l.ano === anoNum)
    }

    if (genero) {
        resultado = resultado.filter(l =>l.genero.toLowerCase().includes(genero.toLowerCase()))
    }

    res.json(resultado)
})

router.put("/livro/:id", (req, res) => {
    const id = Number(req.params.id)
    const livro = livros.find(l => l.id === id)

    if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado" })
    }

    const { titulo, autor, genero, ano } = req.body

    livro.titulo = titulo ?? livro.titulo
    livro.autor = autor ?? livro.autor
    livro.genero = genero ?? livro.genero

    if (ano !== undefined) {
        const anoNum = Number(ano)

        if (!Number.isInteger(anoNum) || anoNum <= 0) {
            return res.status(400).json({
                error: "ano deve ser um número inteiro maior que zero"
            })
        }

        livro.ano = anoNum
    }

    res.json(livro)
})

router.delete("/livro/:id", (req, res) => {
    const index = livros.findIndex(l => l.id === Number(req.params.id))

    if (index === -1) {
        return res.status(404).json({ error: "Livro não encontrado" })
    }

    livros.splice(index, 1)
    res.status(204).send()
})

module.exports = router
