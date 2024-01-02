import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import successBG from '../../assets/success-bg.png'
import Done from '../../assets/icons/done.svg'

import styles from './styles';

export function SuccessCreateClass() {
    const { navigate } = useNavigation()

    function handleNavigationToLogin() {
        navigate("landing")
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={successBG} resizeMode="stretch" style={styles.background}>
                <Done />
                <Text style={styles.title}>Cadastro{'\n'}Salvo!</Text>
                <Text style={styles.subTitle}>Tudo certo, seu cadastro está{'\n'}na nossa lista de professores. Agora é{'\n'}só ficar de olho no seu WhatsApp.</Text>
            </ImageBackground>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleNavigationToLogin()}
            >
                <Text style={styles.textButton}>Fechar</Text>
            </TouchableOpacity>
        </View>
    );
}