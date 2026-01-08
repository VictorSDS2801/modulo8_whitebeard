let movies = []
let nextId = 1
function getNextId() {
    return nextId++
}
module.exports = {movies, getNextId}