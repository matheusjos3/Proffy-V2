import { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Alert
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../contexts/AuthContext";

import LogoSvg from '../../assets/logo-svg.svg';
import CheckSvg from '../../assets/icons/check.svg';
import imageBackground from '../../assets/login-bg.png';

import { FloatingLabel } from "../../components/FloatingLabel";
import { FormBox } from "../../components/FormBox";
import { Button } from "../../components/Button";

import styles from "./styles";

export function Login() {
    const { signIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false);

    const { navigate } = useNavigation()

    function handleNavigationToSignUp() {
        navigate("firstSignUpStep")
    }

    async function login() {
        try {
            await signIn({ email, password, remember })
        } catch (error: any) {
            Alert.alert("Aviso", error.response.data)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            style={styles.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.container}>
                        <View style={styles.backgroundItem}>
                            <ImageBackground resizeMode="contain" style={styles.content} source={imageBackground} >
                                <LogoSvg />
                            </ImageBackground>
                        </View>

                        <View style={styles.formContainer}>
                            <View style={styles.formHeader}>
                                <Text style={styles.title}>Fazer login</Text>

                                <TouchableOpacity
                                    onPress={() => handleNavigationToSignUp()}
                                >
                                    <Text style={styles.textButton}>
                                        Criar uma conta
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <FormBox>
                                <FloatingLabel
                                    label="Email"
                                    type="emailAddress"
                                    onChangeText={value => setEmail(value)}
                                />
                                <View style={styles.divider} />
                                <FloatingLabel
                                    label="Senha"
                                    type="password"
                                    onChangeText={value => setPassword(value)}
                                />
                            </FormBox>

                            <View style={styles.formOptions}>
                                <View style={styles.checkboxView}>
                                    <TouchableOpacity
                                        style={[
                                            styles.checkbox,
                                            {
                                                backgroundColor: remember ? "#04D361" : "#FFF",
                                                borderColor: remember ? "#04D361" : "#E6E6F0"
                                            }
                                        ]}
                                        onPress={() => setRemember(!remember)}
                                    >
                                        <CheckSvg />
                                    </TouchableOpacity>
                                    <Text style={styles.textCheckBox}>Lembrar-me</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => navigate("forgotPassword")}
                                >
                                    <Text style={styles.textForgetPassword}>
                                        Esqueci minha senha
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Button
                                text="Entrar"
                                color="#04D361"
                                isActive={email.length !== 0 && password.length !== 0}
                                disabled={email.length == 0 && password.length == 0}
                                onPress={() => login()}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}