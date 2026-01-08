const express = require("express")
const route = express.Router()
const { products } = require("../dados/products")

route.delete("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "ID inválido"})
    }

    const index = products.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({error: "Produto não encontrado"})
    }

    const remove = products.splice(index, 1)
    return res.status(200).json({message: "Produto removido com sucesso", product: remove[0]})
})
module.exports = route