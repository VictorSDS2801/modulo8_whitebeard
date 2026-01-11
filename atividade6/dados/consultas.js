const consultas = []
let nextId = 1
function criarConsulta(data, idMedico, idPaciente, descricao) {
    const consulta = {id: nextId++, data, idMedico, idPaciente, descricao}
    consultas.push(consulta)
    return consulta
}
module.exports = { consultas, criarConsulta }