const express = require("express")
const router = express.Router()
const { pacientes, criarPaciente } = require("../dados/pacientes")

router.post("/pacientes", (req, res) => {
    const { nome, dataNascimento } = req.body

    if (!nome || !dataNascimento) {
        return res.status(400).json({ error: "Dados inválidos"})
    }

    const paciente = criarPaciente(nome, dataNascimento)
    res.status(201).json(paciente)
})

router.get("/pacientes", (req, res) => {
    let resultado = pacientes
    const { nome, dataNascimento } = req.query

    if (nome) {
        resultado = resultado.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()))
    }

    if (dataNascimento) {
        resultado = resultado.filter(p => p.dataNascimento.toLowerCase().includes(dataNascimento.toLowerCase()))
    }

    res.json(resultado)
})

router.put("/pacientes/:id", (req, res) => {
    const id = Number(req.params.id)
    const paciente = pacientes.find(p => p.id === id)

    if (!paciente) {
        return res.status(404).json({ error: "Paciente não encontrado"})
    }

    paciente.nome = req.body.nome ?? paciente.nome
    paciente.dataNascimento = req.body.dataNascimento ?? paciente.dataNascimento

    res.json(paciente)
})

router.delete("/pacientes/:id", (req, res) => {
    const index = pacientes.findIndex(p => p.id === Number(req.params.id))

    if (index === -1) {
        return res.status(404).json({ error: "Paciente não encontrado"})
    }

    pacientes.splice(index, 1)
    res.status(204).send()
})
module.exports = router