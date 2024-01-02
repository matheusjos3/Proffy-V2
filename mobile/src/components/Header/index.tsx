import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/icons/back.png';
import logoImg from '../../assets/logo.png';

import styles from './styles';

interface HeaderProps {
    topBarTitle: string;
}

export function Header({ topBarTitle }: HeaderProps) {
    const { navigate } = useNavigation();

    return (
        <View style={styles.topBar}>
            <TouchableOpacity
                onPress={() => navigate('landing')}
            >
                <Image source={backIcon} resizeMode='contain' />
            </TouchableOpacity>
            <Text style={styles.topBarTitle}>{topBarTitle}</Text>
            <Image source={logoImg} resizeMode="contain" />
        </View>
    );
}