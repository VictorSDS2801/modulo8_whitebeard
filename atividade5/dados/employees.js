let employees = []
let nextId = 1
function getNextId() {
    return nextId++
}
module.exports = { employees, getNextId}