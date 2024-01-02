import { Text, TextInput, View, TextInputProps } from 'react-native';

import styles from './styles';

interface InputProps extends TextInputProps{
    label: string
}

export function Input({ label, ...rest }: InputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} {...rest} />
        </View>
    );
}