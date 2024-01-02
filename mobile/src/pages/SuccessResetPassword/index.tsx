import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import successBG from '../../assets/success-bg.png'
import Done from '../../assets/icons/done.svg'

import styles from "./styles";

export function SuccessResetPassword() {
    const { navigate } = useNavigation()

    function handleNavigationToLogin() {
        navigate("login")
    }
    
    return (
        <View style={styles.container}>
            <ImageBackground source={successBG} resizeMode="stretch" style={styles.background}>
                <Done />

                <Text style={styles.title}>Redefinição{'\n'}enviada!</Text>
                <Text style={styles.subTitle}>Boa, agora é só checar o e-mail que foi{'\n'}enviado para você redefinir sua senha{'\n'}e aproveitar os estudos.</Text>
            </ImageBackground>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleNavigationToLogin()}
            >
                <Text style={styles.textButton}>Voltar ao login</Text>
            </TouchableOpacity>
        </View>
    );
}