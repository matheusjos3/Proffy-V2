import { StyleSheet } from "react-native";

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
        padding: 24,
        justifyContent: 'center',
    },
    formHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 24,
        color: '#32264D'
    },
    textButton: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#8257E5'
    },
    divider: {
        backgroundColor: '#E6E6F0',
        height: 1
    },
    formInputs: {
        borderWidth: 1,
        borderColor: '#E6E6F0',
        borderRadius: 8,
        backgroundColor: '#FAFAFC',
        marginTop: 24,
        marginBottom: 24
    },
    formOptions: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 24,
        alignItems: "center",
    },
    checkboxView: {
        flexDirection: 'row',
        alignItems: "center",
    },
    checkbox: {
        width: 24,
        height: 24,
        borderColor: '#E6E6F0',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#FFF',
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12
    },
    textCheckBox: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#9C98A6'
    },
    textForgetPassword: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#9C98A6'
    },
    button: {
        backgroundColor: '#04D361',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
    },
    buttonDisable: {
        backgroundColor: '#DCDCE5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8
    },
    buttonText: {
        fontFamily: 'Archivo_500Medium',
        fontSize: 16
    }
})

export default styles;