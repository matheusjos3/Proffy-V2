import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import BackIcon from '../../assets/icons/back-svg.svg';

import { FormBox } from '../../components/FormBox';
import { Button } from '../../components/Button';
import { FloatingLabel } from '../../components/FloatingLabel';

import api from '../../services/api';
import styles from './SecondSignUpStepStyle';

type RouteParams = {
    name: string;
    lastName: string;
}

export function SecondSignUpStep() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const [isCreatingAccount, setIsCreatingAccount] = useState(false)

    const route = useRoute();
    const { navigate, goBack } = useNavigation()

    const { name, lastName } = route.params as RouteParams

    async function signUp() {
        setErrorEmail("")
        setErrorPassword("")

        if (email === "") {
            setErrorEmail("Preencha seu email")
            return
        }

        if (password === "") {
            setErrorPassword("Preencha sua senha")
            return
        }

        setIsCreatingAccount(true);

        await api.post('/user', { name, last_name: lastName, email, password })
            .then(() => navigate("successCreateAccount"))
            .catch(res => {
                setIsCreatingAccount(false)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.indicatorStep}>
                    <View style={styles.dot} />
                    <View style={styles.dotActive} />
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.inner}>

                    <View style={styles.mainTitle}>
                        <Text style={styles.title}>Crie sua {'\n'}conta gratuíta</Text>
                        <Text style={styles.subTitle}>Basta preencher esses dados{'\n'}e você estará conosco.</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.formTitle}>02.  Email e Senha</Text>
                        <FormBox>
                            <FloatingLabel
                                label="Email"
                                type="emailAddress"
                                onChangeText={v => setEmail(v)}
                                messageError={errorEmail}
                            />

                            <View style={styles.divider} />

                            <FloatingLabel
                                label="Senha"
                                type="password"
                                onChangeText={v => setPassword(v)}
                                messageError={errorPassword}
                            />
                        </FormBox>

                        <Button
                            text="Próximo"
                            color="#04D361"
                            isActive={email !== "" && password !== ""}
                            onPress={() => signUp()}
                            loading={isCreatingAccount}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}