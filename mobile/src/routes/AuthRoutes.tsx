import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FirstOnboarding } from '../pages/Onboarding/FirstOnboarding';
import { SecondOnboarding } from '../pages/Onboarding/SecondOnboarding';
import { Login } from '../pages/Login';
import { ForgotPassword } from '../pages/ForgotPassword';
import { FirstSignUpStep } from '../pages/SignUp/FirstSignUpStep';
import { SecondSignUpStep } from '../pages/SignUp/SecondSignUpStep';
import { SuccessCreateAccount } from '../pages/SuccessCreateAccount';
import { SuccessResetPassword } from '../pages/SuccessResetPassword';

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {

    const [showOrboarding, setShowOrboarding] = useState(true);
    const [isCheckingFirstVisit, setIsCheckingFirstVisit] = useState(true);

    useEffect(() => {
        async function checkFirstVisit() {
            const firstVisit = await AsyncStorage.getItem("onboarding")

            if (firstVisit !== null) {
                setShowOrboarding(false)

            } else {
                setShowOrboarding(true)
            }

            setIsCheckingFirstVisit(false)
        }

        checkFirstVisit();
    }, [])

    if (isCheckingFirstVisit) {
        return
    }

    return (
        <Navigator initialRouteName={showOrboarding ? "firstOnboarding" : "login"} screenOptions={{ headerShown: false }}>
            <Screen name='firstOnboarding' component={FirstOnboarding} />
            <Screen name='SecondOnboarding' component={SecondOnboarding} />

            <Screen name='login' component={Login} />
            <Screen name='forgotPassword' component={ForgotPassword} />
            <Screen name='firstSignUpStep' component={FirstSignUpStep} />
            <Screen name='secondSignUpStep' component={SecondSignUpStep} />
            <Screen name='successCreateAccount' component={SuccessCreateAccount} />
            <Screen name='successResetPassword' component={SuccessResetPassword} />
        </Navigator>
    )
}