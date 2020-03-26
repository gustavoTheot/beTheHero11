const express = require('express')

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index)
    
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;

// Criar uma rota pra listas todas as ongs do BD

/*

routes.get('/ongs', )

*/
/*
    Metodos

GET : busca/listar informações do back-end
POST : criar uma informação no back-end
PUT: Alterar informação no back-end
Delete: Deletar informação do back-end

*/

/*
    Tipos de parametros

Query Parmns: Parametros nomeados enviados na rota após "?" (Filtros, paginação)
Route Params: Parametros utilizados para identificar rescursos
Request body: Corpo da requisição, utilizado para criar ou alterar recursos 
*/

/*
    Tipos de BD

SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
NoSQL: MongoDB, CouchDB, etc
*/

