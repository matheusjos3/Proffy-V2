import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons/'

import { useAuth } from '../../contexts/AuthContext';
import { convertMinutesToHours } from '../../utils/ConvertMinutesToHours';

import background from '../../assets/profile_bg.png'

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';

import api from '../../services/api';
import styles from './styles';

interface Schedule {
    id: number,
    week_day: string;
    from: number,
    to: number
}

export function Profile() {
    const { user } = useAuth()
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");
    const [subject, setSubject] = useState("")
    const [cost, setCost] = useState("");
    const [scheduleItems, setScheduleItems] = useState<Schedule[]>([]);

    const [isTeacher, setIsTeacher] = useState(false);
    const [class_id, setClassId] = useState(0);

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
            const id = user?.id

            await api.get("/user", { params: { user_id: id } })
                .then(res => {
                    setName(res.data.user.name)
                    setLastName(res.data.user.last_name)
                    setEmail(res.data.user.email)
                    setWhatsapp(res.data.user.whatsapp)
                    setBio(res.data.user.bio)

                    if (res.data.classes) {
                        setIsTeacher(true)
                        setSubject(res.data.classes.subject)
                        setCost(String(res.data.classes.cost))
                        setScheduleItems(res.data.schedules.map((item: Schedule) => ({
                            id: item.id,
                            week_day: item.week_day,
                            from: convertMinutesToHours(item.from),
                            to: convertMinutesToHours(item.to)
                        })))
                        setClassId(res.data.classes.id)
                    }
                })
                // .catch(err => console.log(err.response))
        }

        getUserData()
    }, [])

    function addNewScheduleItem() {
        if (scheduleItems.length <= 4) {
            api.post('/schedule', { class_id, week_day: 0, from: 0, to: 0 })
                .then(res => {
                    setScheduleItems([
                        ...scheduleItems,
                        { id: res.data.id, week_day: '0', from: 0, to: 0 }
                    ])
                })
                .catch(res => Alert.alert("Erro!", res.response.data.message))
        }
    }

    function removeScheduleItem(id: number) {
        api.delete('/schedule', { data: { id } })
            .then(() => setScheduleItems(scheduleItems => scheduleItems.filter(item => item.id !== id)))
            .catch(res => Alert.alert("Erro!", res.response.data.message))
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

    function handleUpdateUser() {
        const data = { user_id: user?.id, name, email, last_name: lastName, avatar: '', bio, whatsapp, subject, cost, schedule: scheduleItems }

        api.put('/user', data)
            .then(res => Alert.alert("Pronto!", res.data.message))
            .catch(res => Alert.alert("Erro!", res.response.data.message))
    }

    return (
        <View style={styles.container}>
            <Header topBarTitle='Meu Perfil' />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.pageHeader}>
                    <ImageBackground
                        source={background}
                        style={styles.background}
                        resizeMode='stretch'
                    >
                        <View style={styles.imageProfile}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: "https://avatars.githubusercontent.com/u/2254731?v=4" }}
                            />
                            <TouchableOpacity style={styles.camera}>
                                <Feather name="camera" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.textName}>{`${user?.name} ${user?.last_name}`}</Text>
                        <Text style={styles.textSubject}>{subject}</Text>
                    </ImageBackground>
                </View>

                <View style={styles.form}>
                    <View style={styles.formContent}>
                        <View style={styles.formLabel}>
                            <Text style={styles.label}>Seus dados</Text>
                        </View>

                        <Input
                            label='Nome'
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                        <Input
                            label='Sobrenome'
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                        />
                        <Input
                            label='Email'
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <Input
                            label='WhatsApp'
                            value={whatsapp}
                            onChangeText={text => setWhatsapp(text)}
                        />
                        <Input
                            label='Bio'
                            value={bio}
                            multiline
                            onChangeText={text => setBio(text)}
                        />

                        {isTeacher && <>
                            <View style={styles.formLabel}>
                                <Text style={styles.label}>Sobre as aulas</Text>
                            </View>

                            <Select
                                label='Matéria'
                                value={subject}
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
                                value={cost}
                                keyboardType='numeric'
                                onChangeText={value => setCost(value)}
                            />
                        </>}


                        {isTeacher && <>
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

                        </>}
                    </View>

                    <View style={styles.formFooter}>
                        <Button
                            color='#04D361' isActive text='Salvar alterações'
                            onPress={() => handleUpdateUser()}
                        />
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}