const express = require("express")
const router = express.Router()
const { criarConsulta } = require("../dados/consultas")
const { medicos } = require("../dados/medicos")
const { pacientes } = require("../dados/pacientes")

router.post("/consulta", (req, res) => {
    const { data, idMedico, idPaciente, descricao } = req.body

    if (!data || !descricao) {
        return res.status(400).json({ error: "Dados inválidos" })
    }

    const medicoId = Number(idMedico)
    const pacienteId = Number(idPaciente)

    if (!Number.isInteger(medicoId) || medicoId <= 0 || !Number.isInteger(pacienteId) || pacienteId <= 0) {
        return res.status(400).json({
            error: "idMedico e idPaciente devem ser números inteiros maiores que zero"
        })
    }

    if (!medicos.some(m => m.id === medicoId)) {
        return res.status(400).json({ error: "Médico inexistente" })
    }

    if (!pacientes.some(p => p.id === pacienteId)) {
        return res.status(400).json({ error: "Paciente não encontrado" })
    }

    const consulta = criarConsulta(data, medicoId, pacienteId, descricao)
    res.status(201).json(consulta)
})

module.exports = router
