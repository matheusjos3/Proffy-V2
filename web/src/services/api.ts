import axios from 'axios';
import { getLocalStorageToken, getLocalStorageUser, setLocalStorageToken } from '../utils/storage';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

api.interceptors.response.use(response => {
    return response
}, async function (error) {
    const originalConfig = error.config

    if (error.response.status === 401 && error.config && !error.config._retry) {
        originalConfig._retry = true
        const storageToken = getLocalStorageToken()
        const storageUser = getLocalStorageUser()

        if (storageUser && storageToken) {
            try {
                const res = await api.put('/refresh-token', { oldToken: storageToken, id_user: storageUser.id })
                setLocalStorageToken(res.data.token)
                api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                originalConfig.headers['Authorization'] = `Bearer ${res.data.token}`;
                return api(originalConfig)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }

    return Promise.reject(error)
})

export default api;