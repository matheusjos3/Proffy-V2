import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundItem: {
        backgroundColor: '#8257E5',
        padding: 45,
        height: 350,
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackgroundIcon: {
        width: 120,
        height: 120
    },
    footerContainer: {
        paddingHorizontal: 40,
        paddingVertical: 45,
    },
    footerTitle: {
        fontFamily: 'Archivo_500Medium',
        fontSize: 40,
        color: '#6A6180',
        opacity: 0.16
    },
    footerText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 24,
        color: '#6A6180',
        width: 250,
        marginTop: 24,
    },
    onboardingNavigation: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
    },
    pages: {
        gap: 8,
        flexDirection: 'row',
    },
    retangleActive: {
        width: 5,
        height: 5,
        backgroundColor: '#8257E5',
        borderRadius: 5,
    },
    retangle: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#C1BCCC'
    }
});

export default styles;