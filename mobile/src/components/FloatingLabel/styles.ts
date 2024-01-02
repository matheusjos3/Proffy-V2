import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    floatingLabelView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 24,
        paddingBottom: 12,
        paddingHorizontal: 24
    },
    inputArea: {
        flex: 1,
    },
    input: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#6A6180',
    },
    labelContainer: {
        position: 'absolute',
        fontSize: 10,
        zIndex: 1
    },
    label: {
        fontFamily: 'Poppins_400Regular',
    },
    buttonPassword: {
    },
    indicator: {
        position: "absolute",
        width: 2,
        left: -1,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#8257E5',
    },
    errorView: {
        position: "absolute",
        zIndex: 2,
        backgroundColor: '#FAFAFC',
    },
    textError: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 10,
        color: "#E83F5B",
    }
})

export default styles;