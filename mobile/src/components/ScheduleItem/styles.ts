import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    topText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        color: "#9C98A6"
    },
    scheduleDay: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E6E6F0",
        backgroundColor: "#FAFAFC",
        marginTop: 8
    },
    scheduleDayText: {
        fontFamily: "Archivo_700Bold",
        color: "#6A6180",
        fontSize: 16,
    }
});

export default styles;