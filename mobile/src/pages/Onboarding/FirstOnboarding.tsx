import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import imageBackground from '../../assets/onboarding_bg.png';
import StudyIconSvg from '../../assets/icons/studySVG.svg';
import NextIconNvg from '../../assets/icons/next-svg.svg';

import styles from "./FirstOnboardingStyle";

export function FirstOnboarding() {

    const { navigate } = useNavigation();

    function handleNavigationToNextOnbording() {
        navigate('SecondOnboarding');
    }

    return (
        <View style={styles.container}>
            <View style={styles.backgroundItem}>
                <ImageBackground resizeMode="contain" style={styles.content} source={imageBackground} >
                    <StudyIconSvg />
                </ImageBackground>
            </View>

            <View style={styles.footerContainer}>
                <Text style={styles.footerTitle}>01.</Text>
                <Text style={styles.footerText}>Encontre vários professores para ensinar você</Text>

                <View style={styles.onboardingNavigation}>
                    <View style={styles.pages}>
                        <View style={styles.retangleActive} />
                        <View style={styles.retangle} />
                    </View>
                    <TouchableOpacity
                        onPress={() => handleNavigationToNextOnbording()}
                        activeOpacity={0.7}
                    >
                        <NextIconNvg />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}