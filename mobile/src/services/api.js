import axios from 'axios';

const api = axios.create({ baseURL: 'https://chatlsm.herokuapp.com' });

export default api;
