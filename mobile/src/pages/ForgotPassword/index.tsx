import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo-svg.svg';
import imageBackground from '../../assets/login-bg.png';
import BackIcon from '../../assets/icons/back-svg.svg';

import { FloatingLabel } from '../../components/FloatingLabel';
import { Button } from '../../components/Button';
import { FormBox } from '../../components/FormBox';

import styles from './styles';

export function ForgotPassword() {
    const { navigate, goBack } = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.backgroundItem}>
                <ImageBackground resizeMode="contain" style={styles.content} source={imageBackground} >
                    <LogoSvg />
                </ImageBackground>
            </View>

            <View style={styles.formContainer}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => goBack()}
                >
                    <BackIcon />
                </TouchableOpacity>

                <View style={styles.mainTitle}>
                    <Text style={styles.title}>Esqueceu sua senha?</Text>
                    <Text style={styles.subTitle}>Não esquenta,{'\n'}vamos dar um jeito nisso.</Text>
                </View>

                <FormBox>
                    <FloatingLabel
                        label='E-mail'
                        onChangeText={() => { }}
                        type='emailAddress'
                    />
                </FormBox>

                <Button
                    color='#04D361'
                    text='Enviar'
                    isActive={true}
                    onPress={() => navigate("successResetPassword")} />
            </View>
        </View>
    );
}