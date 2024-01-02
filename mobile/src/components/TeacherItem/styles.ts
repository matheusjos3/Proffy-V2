import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#e6e6f8',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    profileInfo: {
        marginLeft: 16
    },
    name: {
        fontFamily: 'Archivo_700Bold',
        color: '#32264D',
        fontSize: 20
    },
    subject: {
        fontFamily: 'Poppins_400Regular',
        color: '#6A6180',
        fontSize: 12,
        marginTop: 4
    },
    bio: {
        marginHorizontal: 24,
        paddingBottom: 24,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 24,
        color: '#6A6180',
    },
    schedule: {
        borderTopColor: "#E6E6F0",
        borderTopWidth: 1
    },
    footer: {
        padding: 24,
        backgroundColor: "#FAFAFC",
        borderTopColor: "#E6E6F0",
        borderTopWidth: 1
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    priceText: {
        fontFamily: 'Poppins_400Regular',
        color: '#6A6180',
        fontSize: 14,
        lineHeight: 24
    },
    priceValue: {
        fontFamily: 'Archivo_700Bold',
        color: '#8257E5',
        fontSize: 16,
        lineHeight: 26
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 8
    },
    favoriteButton: {
        padding: 16,
        backgroundColor: "#8257E5",
        borderRadius: 8
    },
    favorited: {
        backgroundColor: "#E33D3D"
    },
    contactButton: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#04D361",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactButtonText: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 15,
        marginLeft: 16
    }
});

export default styles;