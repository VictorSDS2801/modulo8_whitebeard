const medicos = []
let nextId = 1
function criarMedico(nome, especialidade) {
    const medico = {id: nextId++, nome, especialidade}
    medicos.push(medico)
    return medico
}
module.exports = { medicos, criarMedico}