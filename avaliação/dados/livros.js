const livros = []
let nextId = 1
function criarLivro(titulo, autor, ano, genero) {
    const livro = {id: nextId++, titulo, autor, ano, genero}
    livros.push(livro)
    return livro
}
module.exports = { livros, criarLivro}