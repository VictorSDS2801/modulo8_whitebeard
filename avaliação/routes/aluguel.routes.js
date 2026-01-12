const express = require("express")
const router = express.Router()

const { alugueis, criarAluguel } = require("../dados/alugueis")
const { livros } = require("../dados/livros")
const { estudantes } = require("../dados/estudantes")

router.post("/aluguel", (req, res) => {
    const { idLivro, idEstudante, dataAluguel } = req.body

    if (idLivro === undefined || idEstudante === undefined || !dataAluguel) {
        return res.status(400).json({ error: "Dados inválidos" })
    }

    const livroId = Number(idLivro)
    const estudanteId = Number(idEstudante)

    if (!Number.isInteger(livroId) || livroId <= 0) {
        return res.status(400).json({ error: "idLivro inválido" })
    }

    if (!Number.isInteger(estudanteId) || estudanteId <= 0) {
        return res.status(400).json({ error: "idEstudante inválido" })
    }

    if (!livros.some(l => l.id === livroId)) {
        return res.status(400).json({ error: "Livro inexistente" })
    }

    if (!estudantes.some(e => e.id === estudanteId)) {
        return res.status(400).json({ error: "Estudante inexistente" })
    }

    const aluguel = criarAluguel(livroId, estudanteId, dataAluguel)
    res.status(201).json(aluguel)
})

router.get("/alugueis", (req, res) => {
    let resultado = alugueis
    const { dataAluguel, idLivro, idEstudante } = req.query

    if (dataAluguel) {
        resultado = resultado.filter(a => a.dataAluguel === dataAluguel)
    }

    if (idLivro !== undefined) {
        const livroId = Number(idLivro)

        if (!Number.isInteger(livroId) || livroId <= 0) {
            return res.status(400).json({ error: "idLivro inválido" })
        }

        resultado = resultado.filter(a => a.idLivro === livroId)
    }

    if (idEstudante !== undefined) {
        const estudanteId = Number(idEstudante)

        if (!Number.isInteger(estudanteId) || estudanteId <= 0) {
            return res.status(400).json({ error: "idEstudante inválido" })
        }

        resultado = resultado.filter(a => a.idEstudante === estudanteId)
    }

    res.json(resultado)
})

router.put("/aluguel/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "ID inválido" })
    }

    const aluguel = alugueis.find(a => a.id === id)

    if (!aluguel) {
        return res.status(404).json({ error: "Aluguel não encontrado" })
    }

    const { dataDevolucao } = req.body

    if (!dataDevolucao) {
        return res.status(400).json({ error: "dataDevolucao é obrigatória" })
    }

    aluguel.dataDevolucao = dataDevolucao
    res.json(aluguel)
})

router.delete("/aluguel/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "ID inválido" })
    }

    const index = alugueis.findIndex(a => a.id === id)

    if (index === -1) {
        return res.status(404).json({ error: "Aluguel não encontrado" })
    }

    alugueis.splice(index, 1)
    res.status(204).send()
})

module.exports = router
