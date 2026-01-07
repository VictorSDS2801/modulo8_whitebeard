let students = []
let nextId = 1
function getNextId() {
    return nextId++
}
module.exports = {students, getNextId}