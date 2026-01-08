const express = require("express")
const route = express.Router()

const { products, getNextId } = require("../dados/products")

route.post("/", (req, res) => {
    let { name, category, price, stock } = req.body

    if (!name || !category || stock === undefined || price === undefined) {
        return res.status(400).json({error: "Todos os campos são obrigatórios"})
    }

    price = Number(price)
    stock = Number(stock)

    if (isNaN(price) || price <= 0) {
        return res.status(400).json({error: "O parâmetro 'price' deve ser um número válido."})
    }
    if (!Number.isInteger(stock) || stock <= 0) {
        return res.status(400).json({error: "O parâmetro 'stock' deve ser um número inteiro válido."})
    }

    const newProduct = {id: getNextId(), name, category, price, stock}
    return res.status(201).json(newProduct)
})
module.exports = route