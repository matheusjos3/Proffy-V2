import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../services/api'

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
            const storageUser = localStorage.getItem('ssn_pyd')
            const storageToken = localStorage.getItem('ssn_tkn')

            if (storageUser && storageToken) {
                setUser(JSON.parse(storageUser))
                setAuthenticated(true)
            }

            setLoading(false)
        }

        loadStorageData()
    }, [])

    async function signIn({ email, password, remember }: signInData) {

        const response = await api.post('/login', { email, password })

        if (response.status === 200) {
            if (remember) {
                localStorage.setItem('ssn_pyd', JSON.stringify(response.data.payload))
                localStorage.setItem('ssn_tkn', JSON.stringify(response.data.token))
            }

            setUser(response.data.payload)
            setAuthenticated(true)
            history.push('/home')
        }
    }

    function signOut() {
        localStorage.removeItem('ssn_pyd')
        localStorage.removeItem('ssn_tkn')
        setUser(null)
        setAuthenticated(false)
        history.push('/')
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