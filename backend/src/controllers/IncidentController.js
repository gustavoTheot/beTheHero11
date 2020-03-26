const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query; // criando uma page

        const [count] = await connection('incidents').count(); //pegando todos os valores de incidents que estão insiridos

        console.log(count)

        const incidents = await connection('incidents') // fazendo com que apareça de 5 em 5 incidents na page
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select([
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);

        response.header('X-total-Count', count['count(*)']) // mostrando no cabeçalho da pag

        return response.json(incidents);
    },


    async create(request, response){
        const { title, description, value} = request.body;
        // request.headers; Ele guarda informações do contexto da requisição (autenticação e localização do user)
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description, 
            value,
            ong_id,
        });
        return response.json({id});
    },

    async delete(request, response){
        const { id } = request.params; // pegando o id que vem de resquest.parms
        const ong_id = request.headers.authorization; // pegando o id da ong que vem do create(request.headers).authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

            if(incident.ong_id != ong_id){
                return response.status(401).json({erro: 'Operation not permitted.'}) //Se isso for aceito ele ira continuar no await
            }

            await connection('incidents').where('id', id).delete();

            return response.status(204).send();
    }
}