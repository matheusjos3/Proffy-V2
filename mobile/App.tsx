import { NavigationContainer } from '@react-navigation/native';
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import { StatusBar } from 'expo-status-bar';

import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';
import { Loading } from './src/components/Loading';

export default function App() {

  let [fontLoaded] = useFonts({
    Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold, Archivo_700Bold,
    Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold
  })

  if (!fontLoaded) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
        <StatusBar style="light" />
      </AuthProvider>
    </NavigationContainer>
  );
}
