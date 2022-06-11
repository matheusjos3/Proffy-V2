import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../services/api'
import { clearLocalStorageApp, getLocalStorageToken, getLocalStorageUser, setLocalStorageToken, setLocalStorageUser } from '../utils/storage'

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
    loading: boolean
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        function loadStorageData() {
            const storageUser = getLocalStorageUser()
            const storageToken = getLocalStorageToken()

            if (storageUser && storageToken) {
                setUser(storageUser)
                setAuthenticated(true)
                api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
            }

            setLoading(false)
        }

        loadStorageData()
    }, [])

    async function signIn({ email, password, remember }: signInData) {

        const response = await api.post('/login', { email, password })

        if (response.status === 200) {
            if (remember) {
                setLocalStorageUser(JSON.stringify(response.data.payload))
                setLocalStorageToken(response.data.token)
            }

            setUser(response.data.payload)
            setAuthenticated(true)
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            history.push('/')
        }
    }

    function signOut() {
        clearLocalStorageApp()
        setUser(null)
        setAuthenticated(false)
        history.push('/login')
    }

    return (
        <AuthContext.Provider value={{ authenticated, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}