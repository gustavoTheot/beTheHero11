const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express(); // variavel que vai instanciar a aplicação

app.use(cors()) // quem podera acessar a aplicação
app.use(express.json()) // convertendo o json para algo intendivel pela aplicação
app.use(routes);

app.listen(3333); // mandar ouvir essa porta