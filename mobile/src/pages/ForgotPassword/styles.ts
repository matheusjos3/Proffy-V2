import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F7"
    },
    backgroundItem: {
        backgroundColor: '#8257E5',
        flex: 1,
        padding: 32,
    },
    content: {
        flex: 1,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        paddingHorizontal: 32,
        marginBottom: 40
    },
    back: {
        marginTop: 24
    },
    mainTitle: {
        marginTop: 32,
        marginBottom: 16
    },
    title: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 24,
        color: "#32264D"
    },
    subTitle: {
        marginTop: 16,
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        lineHeight: 24,
        color: "#6A6180"
    },
});

export default styles;