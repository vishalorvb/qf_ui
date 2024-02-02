

import axios from 'axios';




axios.interceptors.request.use(

    function (config) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    function (error) {
        if (error.reponse.status <= 199 || error.reponse.status >= 300) {

        }
        return Promise.reject(error);
    }
);


export default axios;
