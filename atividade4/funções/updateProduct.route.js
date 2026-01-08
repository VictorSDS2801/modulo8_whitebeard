const express = require("express")
const route = express.Router()
const { products } = require("../dados/products")

route.put("/:id", (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({error: "ID inválido"})
    }

    const product = products.find(p => p.id === id)

    if (!product) {
        return res.status(404).json({error: "Produto não encontrado"})
    }

    let { name, category, price, stock } = req.body

    if (price !== undefined) {
        price = Number(price)

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({error: "O parâmetro 'price' deve ser um número válido"})
        }

        product.price = price
    }

    if (stock !== undefined) {
        stock = Number(stock)

        if (!Number.isInteger(stock) || stock <= 0) {
            return res.status(400).json({error: "O parâmetro 'stock' deve ser um número inteiro válido"})
        }

        product.price = price
    }

    if (name !== undefined) product.name = name
    if (category !== undefined) product.category = category

    return res.status(200).json(product)
})
module.exports = route