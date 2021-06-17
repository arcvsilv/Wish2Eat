import axios from 'axios';

const api = axios.create({
    baseURL : 'https://wish2eat.herokuapp.com:443/'
});        

export default api;