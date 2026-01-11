const express = require("express")
const router = express.Router()

const { consultas } = require("../dados/consultas")
const { medicos } = require("../dados/medicos")
const { pacientes } = require("../dados/pacientes")

router.get("/relatorios/consultas/medico/:idMedico", (req, res) => {
    const idMedico = Number(req.params.idMedico)

    if (!Number.isInteger(idMedico) || idMedico <= 0) {
        return res.status(400).json({
          erro: "idMedico deve ser um número inteiro maior que zero"
        })
    }

    const medicoExiste = medicos.some(m => m.id === idMedico)
    if (!medicoExiste) {
        return res.status(404).json({ erro: "Médico não encontrado" })
    }

    const resultado = consultas.filter(c => c.idMedico === idMedico)
    res.json(resultado)
})

router.get("/relatorios/pacientes/medico/:idMedico", (req, res) => {
    const idMedico = Number(req.params.idMedico)

    if (!Number.isInteger(idMedico) || idMedico <= 0) {
        return res.status(400).json({ erro: "idMedico inválido" })
    }

    if (!medicos.some(m => m.id === idMedico)) {
        return res.status(404).json({ erro: "Médico não encontrado" })
    }

    const idsPacientes = consultas
        .filter(c => c.idMedico === idMedico)
        .map(c => c.idPaciente)

    const resultado = pacientes.filter(p => idsPacientes.includes(p.id))
    res.json(resultado)
})

router.get("/relatorios/medicos/paciente/:idPaciente", (req, res) => {
    const idPaciente = Number(req.params.idPaciente)

    if (!Number.isInteger(idPaciente) || idPaciente <= 0) {
        return res.status(400).json({ erro: "idPaciente inválido" })
    }

    if (!pacientes.some(p => p.id === idPaciente)) {
        return res.status(404).json({ erro: "Paciente não encontrado" })
    }

    const idsMedicos = consultas
        .filter(c => c.idPaciente === idPaciente)
        .map(c => c.idMedico)

    const resultado = medicos.filter(m => idsMedicos.includes(m.id))
    res.json(resultado)
})

router.get("/relatorios/consultas/mes/:mes", (req, res) => {
    const mes = req.params.mes // formato esperado: YYYY-MM

    if (!/^\d{4}-\d{2}$/.test(mes)) {
        return res.status(400).json({
         erro: "Formato inválido. Use YYYY-MM"
        })
    }

    const resultado = consultas.filter(c => c.data.startsWith(mes))
    res.json(resultado)
})

module.exports = router
