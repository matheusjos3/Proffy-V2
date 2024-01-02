import { StatusBar } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F7"
    },
    header: {
        marginTop: StatusBar.currentHeight,
        paddingHorizontal: 32,
        paddingVertical: 32,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    indicatorStep: {
        flexDirection: "row",
        gap: 8
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#C1BCCC'
    },
    dotActive: {
        width: 5,
        height: 5,
        backgroundColor: '#8257E5',
        borderRadius: 5,
    },
    inner: {
        padding: 32,
        flex: 1
    },
    mainTitle: {
        flex: 1
    },
    title: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 32,
        color: "#32264D"
    },
    subTitle: {
        marginTop: 16,
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        lineHeight: 24,
        color: "#6A6180"
    },
    form: {
        justifyContent: "flex-end",
        marginTop: 32
    },
    formTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 24,
        color: "#32264D"
    },
    divider: {
        backgroundColor: '#E6E6F0',
        height: 1
    },
})

export default styles;