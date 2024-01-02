import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F7"
    },
    bannerContainer: {
        backgroundColor: "#8257E5",
        paddingBottom: 30,
        paddingHorizontal: 32,

    },
    banner: {
        resizeMode: 'contain',
    },
    bannerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 44,
        marginBottom: 44
    },
    profileInfo: {
        gap: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    username: {
        fontFamily: "Poppins_500Medium",
        fontSize: 12,
        color: "#D4C2FF"
    },
    buttonLogout: {
        backgroundColor: "#774DD6",
        borderRadius: 8,
        padding: 10
    },
    optionsContainer: {
        paddingHorizontal: 32,
        paddingVertical: 44,
    },
    title: {
        fontFamily: "Poppins_400Regular",
        color: "#6A6180",
        fontSize: 20,
        lineHeight: 30,
        marginBottom: 32
    },
    titleBold: {
        fontFamily: "Poppins_600SemiBold"
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: '48%',
        height: 150,
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between'
    },
    buttonPrimary: {
        backgroundColor: '#8257E5',
    },
    buttonSecondary: {
        backgroundColor: '#04D361'
    },
    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 20,
    },
    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#9C98A6',
        lineHeight: 20,
        fontSize: 12,
        marginTop: 40,
    }
});