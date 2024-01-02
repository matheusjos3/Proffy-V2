import { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';

import EyeOn from '../../assets/icons/eye-on.svg';
import EyeOff from '../../assets/icons/eye-off.svg';

import styles from './styles';

interface FloatingLabelProps {
    label: string,
    messageError?: string,
    type: "emailAddress" | "password";
    onChangeText: (value: string) => void;
}

export function FloatingLabel({ label, messageError = "", type, onChangeText }: FloatingLabelProps) {
    const [text, setText] = useState('')
    const [passwordShown, setPasswordShown] = useState(type === 'password')

    const inputRef = useRef<TextInput>(null);

    const transY = useRef(new Animated.Value(0))
    const textAnim = useRef(new Animated.Value(0))
    const fadeAnim = useRef(new Animated.Value(0));

    function handleFocus() {
        handleTransitionAnimation(-14, 200)
        handleTextAnimation(1, 200)
        handleFadeAnimation(1, 200)
    }

    function handleBlur() {
        if (text === '') {
            handleTransitionAnimation(0, 200)
            handleTextAnimation(0, 200)
        }

        handleFadeAnimation(0, 200)
    }

    function handleTransitionAnimation(toValue: number, duration: number) {
        Animated.timing(transY.current, {
            toValue,
            duration,
            useNativeDriver: true
        }).start()
    }

    function handleTextAnimation(toValue: number, duration: number) {
        Animated.timing(textAnim.current, {
            toValue,
            duration,
            useNativeDriver: false
        }).start()
    }

    function handleFadeAnimation(toValue: number, duration: number) {
        Animated.timing(fadeAnim.current, {
            toValue,
            duration,
            useNativeDriver: false
        }).start()
    }

    function tooglePassword() {
        setPasswordShown(!passwordShown)
    }

    const fontSize = textAnim.current.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 10],
        extrapolate: 'clamp'
    })

    const color = textAnim.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['#9C98A6', '#C1BCCC'],
        extrapolate: 'clamp'
    })

    const opacity = fadeAnim.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    return (
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
            <View style={styles.floatingLabelView}>
                <View style={styles.inputArea}>

                    <View style={[styles.errorView, {
                        transform: [{ translateY: -14 }],
                        opacity: messageError !== "" ? 1 : 0,
                    }]
                    }>
                        <Text style={[styles.textError, {
                        }]}>
                            {messageError}
                        </Text>
                    </View>

                    <Animated.View style={[styles.labelContainer, {
                        transform: [
                            { translateY: transY.current }
                        ]
                    }]}>
                        <Animated.Text style={[styles.label, {
                            fontSize, color
                        }]}>
                            {label}
                        </Animated.Text>
                    </Animated.View>

                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        textContentType={type}
                        secureTextEntry={passwordShown}
                        onChangeText={value => {
                            onChangeText(value)
                            setText(value)
                        }}
                    />
                </View>
                {
                    type === 'password' &&
                    <View style={styles.buttonPassword}>
                        <TouchableOpacity
                            onPress={tooglePassword}
                        >
                            {passwordShown ? <EyeOff /> : <EyeOn />}
                        </TouchableOpacity>
                    </View>
                }
                <Animated.View style={[styles.indicator, { opacity }]}></Animated.View>
            </View >
        </TouchableWithoutFeedback>
    )
}