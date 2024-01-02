import { View } from "react-native";
import styles from "./styles";

export function FormBox({ children }: any) {
    return (
        <View style={styles.wrapper}>
            {children}
        </View>
    )
}