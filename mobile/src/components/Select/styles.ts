import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    label: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
    },
    selectContainer: {
        marginTop: 4,
        backgroundColor: "#FAFAFC",
        borderColor: "#E6E6F0",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    placeholderText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        color: "#C1BCCC",
    },
    textSelected: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        color: "#6A6180",
    }
});

export default styles;