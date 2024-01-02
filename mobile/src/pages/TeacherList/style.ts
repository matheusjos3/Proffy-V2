import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },
    toggleFilter: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#9871F5",
        paddingBottom: 16,
        borderBottomWidth: 1,
        marginBottom: 24
    },
    textFilter: {
        fontFamily: "Archivo_400Regular",
        fontSize: 16,
        color: "#D4C2FF",
        marginLeft: 16,
        flex: 1
    },
    searchForm: {
        marginBottom: 24,
    },
    inputGroup: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 8
    },
    inputBlock: {
        flex: 1
    },
    teacherList: {
        marginTop: -40,
        marginBottom: 24,
        padding: 16,

    },
    textEnd: {
        fontFamily: "Poppins_400Regular",
        textAlign: "center",
        color: "#6A6180",
        fontSize: 12,
        marginTop: 8,
        marginBottom: 24
    },
    indicator: {
        marginBottom: 20,
    }
});

export default styles;