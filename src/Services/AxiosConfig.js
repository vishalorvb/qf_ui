

import axios from 'axios';


let ACCESS_TOKEN = localStorage.getItem("token")

axios.interceptors.request.use(
    function (config) {
        config.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


export default axios;
