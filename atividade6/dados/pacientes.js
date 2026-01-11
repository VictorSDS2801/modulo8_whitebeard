const pacientes = []
let nextId = 1
function criarPaciente(nome, dataNascimento) {
    const paciente = {id: nextId++, nome, dataNascimento}
    pacientes.push(paciente)
    return paciente
}
module.exports = { pacientes, criarPaciente }