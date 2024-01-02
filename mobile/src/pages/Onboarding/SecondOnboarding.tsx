import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import imageBackground from '../../assets/onboarding_bg2.png';
import GiveClassesSvg from '../../assets/icons/give-classes-svg.svg';
import NextIconSvg from '../../assets/icons/next-svg.svg';

import styles from "./SecondOnboardingStyle";

export function SecondOnboarding() {

    const { navigate } = useNavigation();

    async function handleNavigationToLogin() {
        AsyncStorage.setItem("onboarding", "1")
        navigate('login');
    }

    return (
        <View style={styles.container}>
            <View style={styles.backgroundItem}>
                <ImageBackground resizeMode="contain" style={styles.content} source={imageBackground} >
                    <GiveClassesSvg />
                </ImageBackground>
            </View>

            <View style={styles.footerContainer}>
                <Text style={styles.footerTitle}>02.</Text>
                <Text style={styles.footerText}>Ou dê aulas sobre o que você mais conhece</Text>

                <View style={styles.onboardingNavigation}>
                    <View style={styles.pages}>
                        <View style={styles.retangle} />
                        <View style={styles.retangleActive} />
                    </View>
                    <TouchableOpacity
                        onPress={() => handleNavigationToLogin()}
                        activeOpacity={0.7}
                    >
                        <NextIconSvg />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}