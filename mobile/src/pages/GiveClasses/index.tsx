import { useEffect, useState } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons/'

import { useAuth } from '../../contexts/AuthContext';

import warning from '../../assets/icons/warning.png';
import DefaultAvatar from '../../assets/default-avatar.svg';

import { Header } from '../../components/Header';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import api from '../../services/api';
import styles from './styles';

interface Schedule {
    id: number,
    week_day: string;
    from: string,
    to: string
}

export function GiveClasses() {
    const { user } = useAuth();

    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState("");
    const [cost, setCost] = useState('');
    const [scheduleItems, setScheduleItems] = useState<Schedule[]>([
        { id: 0, week_day: '', from: '', to: '' },
    ]);

    const { navigate } = useNavigation()

    const times = [
        { value: '06:00', label: '6 horas' },
        { value: '07:00', label: '7 horas' },
        { value: '08:00', label: '8 horas' },
        { value: '09:00', label: '9 horas' },
        { value: '10:00', label: '10 horas' },
        { value: '11:00', label: '11 horas' },
        { value: '12:00', label: '12 horas' },
        { value: '13:00', label: '13 horas' },
        { value: '14:00', label: '14 horas' },
        { value: '15:00', label: '15 horas' },
        { value: '16:00', label: '16 horas' },
        { value: '17:00', label: '17 horas' },
        { value: '18:00', label: '18 horas' },
        { value: '19:00', label: '19 horas' },
        { value: '20:00', label: '20 horas' },
        { value: '21:00', label: '21 horas' },
        { value: '22:00', label: '22 horas' },
        { value: '23:00', label: '23 horas' }
    ]

    useEffect(() => {
        async function getUserData() {
            await api.get('/user', { params: { user_id: user?.id } })
                .then(res => {
                    setWhatsapp(res.data.user.whatsapp)
                    setBio(res.data.user.bio)
                })
        }

        getUserData()
    }, [])

    function addNewScheduleItem() {
        if (scheduleItems.length <= 4) {
            setScheduleItems([
                ...scheduleItems,
                { id: Math.floor(Math.random() * 1000), week_day: '', from: '', to: '' }
            ])
        }
    }

    function removeScheduleItem(indexToRemove: number) {
        setScheduleItems(scheduleItems => scheduleItems.filter(item => item.id !== indexToRemove))
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updataScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })
        setScheduleItems(updataScheduleItems)
    }

    function handleCreateClass() {
        const user_id = user?.id

        api.post("/classes", { user_id, whatsapp, bio, cost: Number(cost), subject, schedule: scheduleItems })
            .then(() => navigate('successCreateClass'))
            .catch(err => Alert.alert("Erro", err.response.data.message))
    }

    return (
        <View style={styles.container}>
            <Header topBarTitle='Dar aulas' />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View style={styles.pageHeader}>
                    <Text style={styles.title}>Que incrível que você{'\n'}quer dar aulas.</Text>
                    <Text style={styles.subTitle}>O primeiro passo, é preencher esse{'\n'}formulário de inscrição.</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.formContent}>
                        <View style={styles.formLabel}>
                            <Text style={styles.label}>Seus dados</Text>
                        </View>

                        <View style={styles.profile}>
                            {user?.avatar
                                ?
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: user?.avatar }}
                                />
                                :
                                <DefaultAvatar style={styles.avatar} />
                            }
                            <View>
                                <Text style={styles.name}>{`${user?.name} ${user?.last_name}`}</Text>
                                <Text style={styles.subject}>{subject}</Text>
                            </View>
                        </View>

                        <Input
                            label='Whatsapp'
                            keyboardType='numeric'
                            onChangeText={value => setWhatsapp(value)}
                            value={whatsapp}
                        />

                        <Input
                            label='Bio'
                            multiline
                            onChangeText={value => setBio(value)}
                            value={bio}
                        />

                        <View style={styles.formLabel}>
                            <Text style={styles.label}>Sobre a aula</Text>
                        </View>

                        <Select
                            label='Matéria'
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciência', label: 'Ciência' },
                                { value: 'Educação fisica', label: 'Educação fisica' },
                                { value: 'Fisica', label: 'Fisica' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Historia', label: 'Historia' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Quimica', label: 'Quimica' },
                            ]}
                            onChangeValue={v => setSubject(v)}
                        />

                        <Input
                            label='Custo da sua hora por aula'
                            keyboardType='numeric'
                            onChangeText={value => setCost(value)}
                            value={cost}
                        />

                        <View style={styles.formLabel}>
                            <Text style={styles.label}>Horários disponíveis</Text>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => addNewScheduleItem()}
                            >
                                <Feather name="plus" size={14} color="#8257E5" />
                                <Text style={styles.addText}>Novo</Text>
                            </TouchableOpacity>
                        </View>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <View key={index}>
                                    <Select
                                        label='Dia da semana'
                                        defaultvalue={scheduleItem.week_day}
                                        value={String(scheduleItem.week_day)}
                                        options={[
                                            { value: '0', label: 'Segunda-feira' },
                                            { value: '1', label: 'Terça-feira' },
                                            { value: '2', label: 'Quarta-feira' },
                                            { value: '3', label: 'Quinta-feira' },
                                            { value: '4', label: 'Sexta-feira' },
                                        ]}
                                        onChangeValue={v => setScheduleItemValue(index, 'week_day', v)}
                                    />

                                    <View style={styles.inputGroup}>
                                        <View style={styles.inputBlock}>
                                            <Select
                                                label='Das'
                                                options={times}
                                                value={scheduleItem.from}
                                                onChangeValue={v => setScheduleItemValue(index, 'from', v)}
                                            />
                                        </View>

                                        <View style={styles.inputBlock}>
                                            <Select
                                                label='Até'
                                                options={times}
                                                value={scheduleItem.to}
                                                onChangeValue={v => setScheduleItemValue(index, 'to', v)}
                                            />
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => removeScheduleItem(scheduleItem.id)}
                                    >
                                        <View style={styles.divider} />
                                        <Text style={styles.textDelete}>Excluir horário</Text>
                                        <View style={styles.divider} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>

                    <View style={styles.formFooter}>
                        <Button
                            color='#04D361'
                            isActive
                            text='Salvar cadastro'
                            onPress={() => handleCreateClass()}
                        />

                        <View style={styles.footerWarning}>
                            <Image source={warning} />
                            <View>
                                <Text style={[styles.textWarning, { color: "#8257E5" }]}>Importante!</Text>
                                <Text style={[styles.textWarning, { color: "#A0A0B2" }]}>Preencha todos os dados</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}