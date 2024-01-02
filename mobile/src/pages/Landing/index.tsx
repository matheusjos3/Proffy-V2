import { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useAuth } from "../../contexts/AuthContext";

import landingImg from '../../assets/landing.png';
import logoutIcon from '../../assets/icons/logout.png';
import studyIcon from '../../assets/icons/study.png';
import giveClassesIcon from '../../assets/icons/give-classes.png';
import heartIcon from '../../assets/icons/heart.png';
import DefaultAvatar from '../../assets/default-avatar.svg';

import api from "../../services/api";
import { styles } from "./styles";

export function Landing() {
    const { user, signOut } = useAuth()
    const [totalConnections, setTotalConnections] = useState(0);

    const { navigate } = useNavigation();

    function handleLogout() {
        signOut()
    }

    function handleNavigationToStudyPages() {
        navigate('study')
    }

    function handleNavigationToGiveclasses() {
        navigate('giveClasses')
    }

    async function getNumberOfConnections() {
        await api.get("/connections")
            .then(res => {
                const { total } = res.data
                setTotalConnections(total)
            })
    }

    useFocusEffect(
        useCallback(() => {
            getNumberOfConnections()
        }, [])
    )

    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
                <View style={styles.bannerHeader}>
                    <TouchableOpacity
                        style={styles.profileInfo}
                        onPress={() => navigate("profile")}
                    >
                        {user?.avatar
                            ?
                            <Image
                                style={styles.avatar}
                                source={{ uri: user?.avatar }}
                            />
                            :
                            <DefaultAvatar style={styles.avatar} />
                        }
                        <Text style={styles.username}>{`${user?.name} ${user?.last_name}`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonLogout}
                        activeOpacity={0.8}
                        onPress={() => handleLogout()}
                    >
                        <Image source={logoutIcon} />
                    </TouchableOpacity>
                </View>
                <Image style={styles.banner} source={landingImg} />
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.optionsContainer}>
                    <Text style={styles.title}>
                        Seja bem-vindo{'\n'}
                        <Text style={styles.titleBold}>O que deseja fazer?</Text>
                    </Text>

                    <View style={styles.buttonsContainer}>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonPrimary]}
                            activeOpacity={0.8}
                            onPress={() => handleNavigationToStudyPages()}
                        >
                            <Image source={studyIcon} />
                            <Text style={styles.buttonText}>Estudar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.buttonSecondary]}
                            activeOpacity={0.8}
                            onPress={() => handleNavigationToGiveclasses()}
                        >
                            <Image source={giveClassesIcon} />
                            <Text style={styles.buttonText}>Dar aulas</Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={styles.totalConnections}>
                        Total de {totalConnections} conexões {'\n'}já realizadas
                        <Image source={heartIcon} />
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}