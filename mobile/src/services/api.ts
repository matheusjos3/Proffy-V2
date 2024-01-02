import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: 'http://192.168.1.38:3333',
})

api.interceptors.response.use(response => {
    return response
}, async function (error) {
    const originalConfig = error.config

    if (error.response.status === 401 && error.config && !error.config._retry) {
        originalConfig._retry = true
        const storageToken = await AsyncStorage.getItem("ssn_tkn")
        const storageUser = await AsyncStorage.getItem("ssn_pyd")
        const user = storageUser ? JSON.parse(storageUser) : null

        if (user != null && storageToken) {
            try {
                const res = await api.put('/refresh-token', { oldToken: storageToken, id_user: user.id })
                await AsyncStorage.setItem("ssn_tkn", res.data.token)
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