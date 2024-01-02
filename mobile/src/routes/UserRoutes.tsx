import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Landing } from "../pages/Landing"
import { StudyTabs } from "./StudyTabs"
import { GiveClasses } from "../pages/GiveClasses"
import { Profile } from "../pages/Profile"
import { SuccessCreateClass } from "../pages/SuccessCreateClass"

const { Navigator, Screen } = createNativeStackNavigator()

export function UserRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='landing' component={Landing} />
            <Screen name='study' component={StudyTabs} />
            <Screen name='giveClasses' component={GiveClasses} />
            <Screen name='profile' component={Profile} />
            <Screen name='successCreateClass' component={SuccessCreateClass} />
        </Navigator>
    )
}