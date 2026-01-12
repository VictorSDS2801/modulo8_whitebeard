const alugueis = []
let nextId = 1
function criarAluguel(idLivro, idEstudante, dataAluguel) {
    const aluguel = {id: nextId++, idLivro, idEstudante, dataAluguel}
    alugueis.push(aluguel)
    return aluguel
}
module.exports = {alugueis, criarAluguel}