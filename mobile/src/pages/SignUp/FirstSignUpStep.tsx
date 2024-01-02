import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import BackIcon from '../../assets/icons/back-svg.svg';

import { FormBox } from "../../components/FormBox";
import { FloatingLabel } from "../../components/FloatingLabel";
import { Button } from "../../components/Button";

import styles from "./FirstSignUpStepStyle";

export function FirstSignUpStep() {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [errorName, setErrorName] = useState("")
    const [errorLastName, setErrorLastName] = useState("")

    const { navigate, goBack } = useNavigation()

    function handleNavigationToNextStep() {
        setErrorName("");
        setErrorLastName("");

        if (name === "" || name.length < 4) {
            setErrorName("Campo inválido")
            return
        }

        if (lastName === "" || lastName.length < 4) {
            setErrorLastName("Campo inválido")
            return
        }

        navigate("secondSignUpStep", { name, lastName })
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={styles.indicatorStep}>
                    <View style={styles.dotActive} />
                    <View style={styles.dot} />
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.inner}>

                    <View style={styles.mainTitle}>
                        <Text style={styles.title}>Crie sua {'\n'}conta gratuíta</Text>
                        <Text style={styles.subTitle}>Basta preencher esses dados{'\n'}e você estará conosco.</Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.formTitle}>01.  Quem é você?</Text>
                        <FormBox>
                            <FloatingLabel
                                label="Nome"
                                type="emailAddress"
                                onChangeText={v => setName(v)}
                                messageError={errorName}
                            />

                            <View style={styles.divider} />

                            <FloatingLabel
                                label="Sobrenome"
                                type="emailAddress"
                                onChangeText={v => setLastName(v)}
                                messageError={errorLastName}
                            />
                        </FormBox>

                        <Button
                            text="Próximo"
                            color="#8257E5"
                            isActive={name !== "" && name.length >= 4 && lastName !== "" && lastName.length >= 4}
                            onPress={() => handleNavigationToNextStep()}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}