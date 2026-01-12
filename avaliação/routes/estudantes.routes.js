const express = require("express")
const router = express.Router()
const { estudantes, criarEstudante } = require("../dados/estudantes")

router.post("/estudante", (req, res) => {
    const { nome, matricula, curso, ano} = req.body

    if (!nome || matricula === undefined || !curso || ano === undefined) {
        return res.status(400).json({ error: "Dados inválidos" })
    }

    const anoNum = Number(ano)

    if (!Number.isInteger(anoNum) || anoNum <= 0) {
        return res.status(400).json({error: "O atributo 'ano' deve ser um número inteiro maior que zero"})
    }

    const matriculaNum = Number(matricula)

    if(!Number.isInteger(matriculaNum) || matriculaNum <= 0) {
        return res.status(400).json({error: "O atributo 'matricula' deve ser um número inteiro maior que zero"})
    }

    const estudante = criarEstudante(nome, matriculaNum, curso, anoNum)
    res.status(201).json(estudante)
})

router.get("/estudante", (req, res) => {
    let resultado = estudantes
    const { nome, matricula, curso, ano } = req.query

    if (nome) {
        resultado = resultado.filter(e => e.nome.toLowerCase().includes(nome.toLowerCase()))
    }

    if (curso) {
        resultado = resultado.filter(e => e.curso.toLowerCase().includes(curso.toLowerCase()))
    }
    if (matricula !== undefined) {
        const matriculaNum = Number(matricula)

        if (!Number.isInteger(matriculaNum) || matriculaNum <= 0) {
            return res.status(400).json({error: "O atributo 'matricula' deve ser um número inteiro maior que zero"})
        }

        resultado = resultado.filter(e => e.matricula === matriculaNum)
    }

    if (ano !== undefined) {
        const anoNum = Number(ano)

        if (!Number.isInteger(anoNum) || anoNum <= 0) {
            return res.status(400).json({error: "O atributo 'ano' deve ser um número inteiro maior que zero"})
        }

        resultado = resultado.filter(e => e.ano === anoNum)
    }

    res.json(resultado)
})

router.put("/estudante/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "ID inválido" })
    }

    const estudante = estudantes.find(e => e.id === id)



    if (!estudante) {
        return res.status(404).json({ error: "Estudante não encontrado" })
    }

    const { nome, matricula, curso, ano} = req.body

    estudante.nome = nome ?? estudante.nome
    estudante.curso = curso ?? estudante.curso

    if (matricula !== undefined) {
        const matriculaNum = Number(matricula)

        if (!Number.isInteger(matriculaNum) || matriculaNum <= 0) {
            return res.status(400).json({error: "O atributo 'matricula' deve ser um número inteiro maior que zero"})
        }

        estudante.matricula = matriculaNum
    }

    if (ano !== undefined) {
        const anoNum = Number(ano)

        if (!Number.isInteger(anoNum) || anoNum <= 0) {
            return res.status(400).json({error: "O atributo 'ano' deve ser um número inteiro maior que zero"})
        }

        estudante.ano = anoNum
    }

    res.json(estudante)
})

router.delete("/estudante/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "ID inválido" })
    }
    
    const index = estudantes.findIndex(e => e.id === id)


    if (index === -1) {
        return res.status(404).json({ error: "Estudante não encontrado" })
    }

    estudantes.splice(index, 1)
    res.status(204).send()
})
module.exports = router