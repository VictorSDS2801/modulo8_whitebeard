const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

app.use(require("./routes/aluguel.routes"))
app.use(require("./routes/estudantes.routes"))
app.use(require("./routes/livros.routes"))

app.listen(port, () => {
    console.log("Servidor rodando na porta 3000")
})
