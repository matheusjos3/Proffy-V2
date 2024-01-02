import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F7"
    },
    pageHeader: {
        backgroundColor: "#8257E5",
        paddingHorizontal: 48,
        paddingBottom: 80,
        paddingTop: 32,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 100
    },
    background: {
        alignItems: "center",
        justifyContent: "center",
    },
    imageProfile: {
        position: "relative",
    },
    camera: {
        width: 40,
        height: 40,
        position: "absolute",
        bottom: 0,
        right: 0,
        borderRadius: 50,
        backgroundColor: "#04D361",
        alignItems: "center",
        justifyContent: "center"
    },
    textName: {
        fontFamily: "Archivo_700Bold",
        color: "#FFF",
        fontSize: 24,
        marginTop: 24
    },
    textSubject: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        color: "#D4C2FF"
    },
    form: {
        marginTop: -40,
        marginBottom: 24,
        marginHorizontal: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E6E6F0",
        flex: 1
    },
    formLabel: {
        borderBottomWidth: 1,
        borderBottomColor: "#E6E6F0",
        paddingBottom: 8,
        marginVertical: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    label: {
        fontFamily: "Archivo_600SemiBold",
        fontSize: 20,
        color: "#32264D",
    },
    formContent: {
        paddingHorizontal: 24,
    },
    addButton: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center"
    },
    addText: {
        fontFamily: "Archivo_600SemiBold",
        color: "#8257E5",
        fontSize: 14
    },
    inputBlock: {
        flex: 1
    },
    inputGroup: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 16
    },
    formFooter: {
        marginTop: 16,
        backgroundColor: "#FAFAFC",
        borderTopColor: "#E6E6F0",
        borderTopWidth: 1,
        padding: 24,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8
    },
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 24
    },
    divider: {
        height: 1,
        backgroundColor: "#E6E6F0",
        flex: 1
    },
    textDelete: {
        fontFamily: "Archivo_600SemiBold",
        fontSize: 12,
        marginHorizontal: 24,
        color: "#E33D3D"
    }
});

export default styles;