import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from "react-native";
import styles from "./style";

interface ButtonProps extends TouchableOpacityProps {
    text: string,
    isActive: boolean,
    loading?: boolean,
    color: string
}

export function Button({ text, isActive, loading, color, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, {
                backgroundColor: isActive ? color : "#DCDCE5",
            }]}
            {...rest}
        >
            <Text style={[styles.text, {
                color: isActive ? "#FFFFFF" : "#9C98A6"
            }]}>
                {loading ? <ActivityIndicator animating={true} color={isActive ? "#FFFFFF" : "#9C98A6"} size={16}/> : text}
            </Text>
        </TouchableOpacity>
    )
}