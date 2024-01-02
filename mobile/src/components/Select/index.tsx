import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons/'

import { OptionsProps, SelectModal } from '../SelectModal';

import styles from './styles';

interface ItemProps {
    label: string;
    options: Array<OptionsProps>;
    labelColor?: string;
    defaultvalue?: string,
    value?: string | number
    onChangeValue: (value: string) => void;
}

export function Select({ label, options, value, defaultvalue = "", labelColor = "#9C98A6", onChangeValue }: ItemProps) {
    const [itemSelected, setItemSelected] = useState<String>("")
    const [modalVisible, setModalVisible] = useState(false)

    function handleOpenModal() {
        setModalVisible(!modalVisible)
    }

    function handleItemSelect(value: String) {
        setItemSelected(value)
        handleOpenModal()
    }

    useEffect(() => {
        const findItem = options.find(i => i.value === value)

        if (findItem !== undefined) {
            setItemSelected(findItem.label)
        }

    }, [value])

    return (
        <View>
            <Text style={[styles.label, { color: labelColor }]}>{label}</Text>

            <TouchableOpacity
                style={styles.selectContainer}
                onPress={() => handleOpenModal()}
                activeOpacity={0.8}
            >
                {
                    itemSelected === "" ?
                        <Text style={[styles.placeholderText]}>
                            Selecione
                        </Text>
                        :
                        <Text style={styles.textSelected} >
                            {itemSelected}
                        </Text>
                }
                <Feather name="chevron-down" size={20} color="#9C98A6" />
            </TouchableOpacity>

            <SelectModal
                visible={modalVisible}
                itens={options}
                onRequestClose={() => { handleOpenModal() }}
                handleOnChange={selected => {
                    onChangeValue(selected.value)
                    handleItemSelect(selected.label)
                }}
            />
        </View>
    );
}