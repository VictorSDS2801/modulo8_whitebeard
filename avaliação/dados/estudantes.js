const estudantes = []
let nextId = 1
function criarEstudante(nome, matricula, curso, ano){
    const estudante = {id: nextId++, nome, matricula, curso, ano}
    estudantes.push(estudante)
    return estudante
}
module.exports = { estudantes, criarEstudante }