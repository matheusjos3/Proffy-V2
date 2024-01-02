import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8257E5",
        paddingVertical: 52,
        paddingHorizontal: 40
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 32,
        fontFamily: "Archivo_700Bold",
        textAlign: "center"
    },
    subTitle: {
        color: "#D4C2FF",
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        textAlign: "center",
        marginTop: 16
    },
    button: {
        padding: 15,
        backgroundColor: "#04D361",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 32
    },
    textButton: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "Archivo_500Medium"
    }
})

export default styles;