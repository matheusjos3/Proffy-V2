import { View, Text, FlatList, Modal, TouchableOpacity, ModalProps } from 'react-native';

import styles from './styles';

interface Props extends ModalProps {
    visible: boolean;
    itens: Array<OptionsProps>;
    handleOnChange: (selected: OptionsProps) => void;
}

export interface OptionsProps {
    label: string,
    value: string
}

export function SelectModal({ itens, handleOnChange, ...rest }: Props) {

    function renderItens(item: OptionsProps) {
        return (
            <TouchableOpacity
                style={styles.itemListContainer}
                onPress={() => {
                    handleOnChange(item)
                }}
            >
                <Text style={styles.itemListText}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            {...rest}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBar} />

                <Text style={styles.modalContentText}>Selecione uma opção</Text>

                <FlatList
                    data={itens}
                    keyExtractor={(item) => String(item.label)}
                    renderItem={({ item }) => renderItens(item)}
                />
            </View>
        </Modal>
    );
}