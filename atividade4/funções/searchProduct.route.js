const express = require("express")
const route = express.Router()
const { products } = require("../dados/products")

route.get("/busca", (req, res) => {
    let {name, category, price, stock} = req.body

    let result = products

    if (name !== undefined) {
        result = result.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
    }

    if (category !== undefined) {
        result = result.filter(p => p.category.toLowerCase().includes(category.toLowerCase()))
    }

    if (price !== undefined) {
        price = Number(price)

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({error: "O campo 'price' deve ser um número."})
        }

        result = result.filter(p => p.price === price)
    }

    if (stock !== undefined) {
        stock = Number(stock)

        if (isNaN(stock) || stock <= 0) {
            return res.status(400).json({error: "O campo 'stock' deve ser um número inteiro."})
        }

        result = result.filter(p => p.stock === stock)
    }

    return res.status(200).json(result)
})
module.exports = route