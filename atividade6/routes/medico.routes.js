const express = require("express")
const router = express.Router()
const { medicos, criarMedico } = require("../dados/medicos")

router.post("/medicos", (req, res) => {
    const { nome, especialidade } = req.body

    if (!nome || !especialidade) {
        return res.status(400).json({error: "Dados inválidos"})
    }

    const medico = criarMedico(nome, especialidade)
    res.status(201).json(medico)
})

router.get("/medicos", (req, res) => {
    let resultado = medicos
    const { nome, especialidade } = req.query

    if (nome) {
        resultado = resultado.filter(m => m.nome.toLowerCase().includes(nome.toLowerCase()))
    }

    if (especialidade) {
        resultado = resultado.filter(m => m.especialidade.toLowerCase().includes(especialidade.toLowerCase()))
    }

    res.json(resultado)
})

router.put("/medicos/:id", (req, res) => {
    const id = Number(req.params.id)
    const medico = medicos.find(m => m.id === id)

    if (!medico) {
        return res.status(404).json({error: "Médico não encontrado"})
    }

    medico.nome = req.body.nome ?? medico.nome
    medico.especialidade = req.body.especialidade ?? medico.especialidade

    res.json(medico)
})

router.delete("/medicos/:id", (req, res) => {
    const index = medicos.findIndex(m => m.id === Number(req.params.id))

    if (index === -1) {
        return res.status(404).json({error: "Médico não encontrado"})
    }

    medicos.splice(index, 1)
    res.status(204).send()
})

module.exports = router