import axios from 'axios';

const api = axios.create({

    baseURL: 'http://localhost:3333', // local padrão de rotas 
})

export default api;