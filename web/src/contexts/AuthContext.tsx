import { createContext, useContext, useState } from 'react'
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
    signIn: (data: signInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    async function signIn({ email, password, remember }: signInData) {

        const response = await api.post('/login', { email, password })

        if (response.status === 200) {
            if (remember) {
                localStorage.setItem('ssn_pyd', JSON.stringify(response.data.payload))
                localStorage.setItem('ssn_tkn', JSON.stringify(response.data.token))
            }

            setUser(response.data.payload)
            setAuthenticated(true)
        }
    }

    return (
        <AuthContext.Provider value={{ authenticated, user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}