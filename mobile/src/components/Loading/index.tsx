import { View, ActivityIndicator, Text } from "react-native"

export function Loading() {
    return (
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <ActivityIndicator size={"large"} color={"#6A6180"}/>
            <Text>Carregando</Text>
        </View>
    );
}