import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 32,
        backgroundColor: '#8257e5'
    },
    headerInfo: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginVertical: 40
    },
    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 24,
        lineHeight: 32,
        maxWidth: 160,
    },
    textInfoView: {
        alignItems: "center",
        flexDirection: "row",
        gap: 8
    },
    textInfo: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        color: "#D4C2FF",
    },
    emoji: {
        fontSize: 20,
    }
});

export default styles;