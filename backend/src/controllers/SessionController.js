const connection = require('../database/connection'); // connection com o bd

module.exports = {
    async create(request, response){
        const {id} = request.body; // o id vai vir atraves do corpo

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first(); // tentar buscar uma ong do bd 

        if (!ong){
            return response.status(400).json({erro: 'No ONG found with this ID'});
        }

        return response.json(ong);
    }
}