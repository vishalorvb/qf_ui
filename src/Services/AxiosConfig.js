

import axios from 'axios';




axios.interceptors.request.use(

    function (config) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    function (error) {
        console.log(error)
        if (error.reponse.status <= 199 || error.reponse.status >= 300) {
            console.log("Error in call")
        }
        return Promise.reject(error);
    }
);


export default axios;
