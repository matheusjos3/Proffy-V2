import { Text } from 'react-native'

import { useAuth } from "../contexts/AuthContext";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";
import { Loading } from '../components/Loading';

export function Routes() {
    const { authenticated, loading } = useAuth()
    
    if(loading){
        return <Loading/>
    }
    
    return authenticated ? <UserRoutes /> : <AuthRoutes />
}