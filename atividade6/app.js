const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

app.use(require("./routes/medico.routes"))
app.use(require("./routes/paciente.routes"))
app.use(require("./routes/consulta.routes"))
app.use(require("./routes/relatorios.routes"))

app.listen(port, () => {
    console.log("Servidor rodando na porta 3000")
})