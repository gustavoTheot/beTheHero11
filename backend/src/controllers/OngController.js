// exportar o objeto com os metodos
const crypto = require('crypto') // criação de caracteres aleatorio 
const connection = require('../database/connection'); // connection com o bd

module.exports = {

/*
    Tipos de connection

Async: É necessario telo no escopo pai de onde foi utilizado o await
Await: aguardar o codigo finalizar para ele poder continuar continuar
*/
    async index(request, response) { // requisição e resposta do servidor
        const ongs = await connection('ongs').select('*'); // connectando na tabela ongs e selecionanando tudo
    
        return response.json(ongs) // retornando um array com a list
    },


    async create(request, response){ // requisição e resposta do servidor
        const {name, email, whatsapp, city, uf} = request.body; // pegar o corpo da resquisição 

        const id = crypto.randomBytes(4).toString('HEX');

        // Conecção com o BD: 
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({id}); // resposta no formato de json
        // rota de onde deve começar a pagina
    }
};