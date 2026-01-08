const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

const createProduct = require("./funções/createProduct.route")
const listProducts = require("./funções/listProducts.route")
const updateProduct = require("./funções/updateProduct.route")
const deleteProduct = require("./funções/deleteProduct.route")
const searchProduct = require("./funções/searchProduct.route")

app.use("/produtos", createProduct)
app.use("/produtos", listProducts)
app.use("/produtos", updateProduct)
app.use("/produtos", deleteProduct)
app.use("/produtos", searchProduct)

app.listen(port, () => {
    console.log("Servidor rodando na ports 3000")
})