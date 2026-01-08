let products = []
let nextId = 1
function getNextId() {
    return nextId++
}
module.exports = { products, getNextId }