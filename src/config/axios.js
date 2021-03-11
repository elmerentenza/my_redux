import axios from 'axios';

const clienteAxios = axios.create({
    //baseURL : process.env.REACT_APP_BACKEND_URL
    baseURL : 'https://my-json-server.typicode.com/elmerentenza/jsondb/'
});

export default clienteAxios;
