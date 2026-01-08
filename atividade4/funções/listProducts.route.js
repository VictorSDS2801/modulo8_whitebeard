const express = require("express")
const route = express.Router()

const  { products } = require("../dados/products")

route.get("/", (req, res) => {
    return res.status(200).send(products)
})
module.exports = route