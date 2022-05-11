import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

api.interceptors.response.use(response => {
    return response
}, err => {
    return new Promise((resolve, reject) => {
        console.log(err)
        reject(err)
    })
})

export default api;