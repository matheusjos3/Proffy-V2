import { View, Text } from 'react-native';

import { Header } from '../Header';
import styles from './styles';

interface PageHeaderProps {
    headerTitle: string;
    pageHeaderTitle: string;
    emoji: string;
    textInfo: string;
    children?: React.ReactNode;
}

export function PageHeader({ headerTitle, pageHeaderTitle, emoji, textInfo, children }: PageHeaderProps) {
    return (
        <View>
            <Header topBarTitle={`${headerTitle}`} />
            <View style={styles.container}>
                <View style={styles.headerInfo}>
                    <Text style={styles.title}>{pageHeaderTitle}</Text>
                    <View style={styles.textInfoView}>
                        <Text style={styles.emoji}>{emoji}</Text>
                        <Text style={styles.textInfo}>{textInfo}</Text>
                    </View>
                </View>
                {children}
            </View>
        </View>
    );
}