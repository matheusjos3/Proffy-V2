import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import successBG from '../../assets/success-bg.png'
import Done from '../../assets/icons/done.svg'

import styles from "./styles";

export function SuccessCreateAccount() {
    const { navigate } = useNavigation()

    function handleNavigationToLogin() {
        navigate("login")
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={successBG} resizeMode="stretch" style={styles.background}>
                <Done />

                <Text style={styles.title}>Cadastro{'\n'}concluído!</Text>
                <Text style={styles.subTitle}>Agora você faz parte da{'\n'}plataforma da Proffy</Text>
            </ImageBackground>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleNavigationToLogin()}
            >
                <Text style={styles.textButton}>Fazer login</Text>
            </TouchableOpacity>
        </View>
    )
}