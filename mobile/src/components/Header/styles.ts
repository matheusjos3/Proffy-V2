import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    topBar: {
        paddingTop: 32,
        paddingBottom: 16,
        paddingHorizontal: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#6842C2",
        backgroundColor: "#774DD6"
    },
    topBarTitle: {
        fontFamily: "Archivo_500Medium",
        fontSize: 14,
        color: "#D4C2FF"
    },
});

export default styles;