import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons";

import { TeacherList } from "../pages/TeacherList"
import { Favorites } from "../pages/Favorites"

const { Navigator, Screen } = createBottomTabNavigator()

export function StudyTabs() {
    return (
        <Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    fontFamily: "Archivo_700Bold",
                    fontSize: 12,
                    marginLeft: 16
                },
                tabBarStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64
                },
                tabBarItemStyle: {
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                tabBarIconStyle: {
                    flex: 0,
                    width: 24,
                    height: 24
                },
                tabBarInactiveBackgroundColor: "#fafafc",
                tabBarActiveBackgroundColor: "#ebebf5",
                tabBarInactiveTintColor: "#c1bccc",
                tabBarActiveTintColor: "#32264d",
                headerShown: false,
            }}
        >
            <Screen
                name="teacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: "Proffys",
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons
                                name={focused ? "ios-easel" : "ios-easel-outline"}
                                size={size}
                                color={focused ? "#8257e5" : color}
                            />
                        )
                    }
                }}
            />
            <Screen
                name="favorites"
                component={Favorites}
                options={{
                    tabBarLabel: "Favoritos",
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons
                                name={focused ? "ios-heart" : "ios-heart-outline"}
                                size={size}
                                color={focused ? "#8257e5" : color}
                            />
                        )
                    }
                }}
            />
        </Navigator>
    )
}