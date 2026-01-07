let books = []
let nextId = 1

function getNextId() {
    return nextId++
}

module.exports = { books, getNextId }