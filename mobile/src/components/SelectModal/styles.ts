import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
    itemListContainer: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderTopColor: "#E6E6F0",
        borderTopWidth: 1
    },
    itemListText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        color: "#6A6180"
    },
    modalContainer: {
        flex: 1,
        marginTop: 200,
        backgroundColor: "#FAFAFC",
        borderRadius: 8,
        elevation: 20
    },
    modalBar: {
        width: 40,
        height: 2,
        backgroundColor: "#9C98A6",
        marginTop: 14,
        alignSelf: "center",
        borderRadius: 2
    },
    modalContentText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        color: "#C1BCCC",
        paddingVertical: 12,
        paddingHorizontal: 24,
        textAlign: "center"
    }
});

export default styles;