import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

import api from "../services/api"

interface User {
    id: number,
    name: string,
    last_name: string,
    avatar: string
}

interface signInData {
    email: string,
    password: string,
    remember: boolean
}

interface AuthContextData {
    user: User | null,
    authenticated: boolean,
    signIn: (data: signInData) => Promise<void>,
    signOut: () => void,
    loading: boolean,
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem("ssn_pyd")
            const storageToken = await AsyncStorage.getItem("ssn_tkn")
            const remember = await AsyncStorage.getItem("rmb_ssn")


            if (storageUser && storageToken && remember) {
                setUser(JSON.parse(storageUser))
                setAuthenticated(true)
                api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
            } else {
                await AsyncStorage.removeItem("ssn_pyd")
                await AsyncStorage.removeItem("ssn_tkn")
                await AsyncStorage.removeItem("rmb_ssn")
            }

            setLoading(false)
        }

        loadStorageData()
    }, [])

    async function signIn({ email, password, remember }: signInData) {
        const response = await api.post('/login', { email, password })

        if (response.status === 200) {

            await AsyncStorage.setItem("ssn_pyd", JSON.stringify(response.data.payload))
            await AsyncStorage.setItem("ssn_tkn", response.data.token)

            if (remember) {
                await AsyncStorage.setItem("rmb_ssn", String(remember))
            }

            setUser(response.data.payload)
            setAuthenticated(true)
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        }
    }

    async function signOut() {
        await AsyncStorage.removeItem("ssn_pyd")
        await AsyncStorage.removeItem("ssn_tkn")
        await AsyncStorage.removeItem("rmb_ssn")

        setUser(null)
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ signIn, user, signOut, authenticated, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}