import { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons/'

import { useAuth } from '../../contexts/AuthContext'

import { PageHeader } from '../../components/PageHeader'
import { Teacher, TeacherItem } from '../../components/TeacherItem'
import { Select } from '../../components/Select'

import api from '../../services/api'
import styles from './style'

interface Favorite {
    teacher_id: number
}

export function TeacherList() {
    const { user } = useAuth()
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [countTeachers, setCountTeachers] = useState(0);

    const [subject, setSubject] = useState("");
    const [week_day, setWeekDay] = useState("");
    const [time, setTime] = useState("");

    const [favoritesId, setFavoritesId] = useState<Favorite[]>([]);
    const isFavorited = (t: Teacher) => favoritesId.map(item => item.teacher_id).includes(t.user_id)

    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [isFiltersVisible, setisFiltersVisible] = useState(true);

    function handleToggleFiltersVisible() {
        setisFiltersVisible(!isFiltersVisible);
    }

    useEffect(() => {
        async function searchTeachers() {
            if (subject !== '' && week_day !== '' && time !== '') {

                setTeachers([])
                setIsLoading(true)

                await api('/classes', { params: { subject, week_day, time, page: 1 } })
                    .then(response => {
                        setTeachers(response.data)
                        setCurrentPage(currentPage => currentPage + 1)
                    })

                setIsLoading(false)
            }
        }

        searchTeachers();
    }, [subject, week_day, time]);

    useEffect(() => {
        async function getNumberOfClasses() {
            await api.get('/count-classes')
                .then(response => {
                    setCountTeachers(response.data.total)
                })
        }

        getNumberOfClasses()
    }, [])

    useEffect(() => {
        async function getFavoritesId() {
            await api.get('/favorites', { params: { user_id: user?.id, page: 1 } })
                .then(response => {
                    setFavoritesId(response.data.favorites_id)
                })
        }

        getFavoritesId()
    }, [])

    async function loadMore() {
        if (hasMore) {
            setIsLoading(true)
            await api('/classes', { params: { subject, week_day, time, page: currentPage } })
                .then(response => {
                    if (response.data.length !== 0) {
                        setTeachers(prev => prev.concat(response.data))
                        setCurrentPage(currentPage => currentPage + 1)
                    } else {
                        setHasMore(false)
                    }
                })

            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <PageHeader
                headerTitle='Estudar'
                pageHeaderTitle={`Proffys\nDisponíveis`}
                emoji='🤓'
                textInfo={`${countTeachers} proffys`}
            >
                <TouchableOpacity
                    style={styles.toggleFilter}
                    onPress={() => handleToggleFiltersVisible()}
                    activeOpacity={0.8}
                >
                    <Feather name="filter" size={24} color="#04D361" />
                    <Text style={styles.textFilter}>Filtrar por dia, hora e matéria</Text>

                    <Feather name="chevron-down" size={24} color="#A380F6" />
                </TouchableOpacity>

                {
                    isFiltersVisible && (
                        <View style={styles.searchForm}>
                            <Select
                                label="Matéria"
                                labelColor="#D4C2FF"
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
                                onChangeValue={value => setSubject(value)}
                            />

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Select
                                        label="Dia da semana"
                                        labelColor="#D4C2FF"
                                        options={[
                                            { value: '0', label: 'Segunda-feira' },
                                            { value: '1', label: 'Terça-feira' },
                                            { value: '2', label: 'Quarta-feira' },
                                            { value: '3', label: 'Quinta-feira' },
                                            { value: '4', label: 'Sexta-feira' },
                                        ]}
                                        onChangeValue={value => setWeekDay(value)}
                                    />
                                </View>
                                <View style={styles.inputBlock}>
                                    <Select
                                        label="Horário"
                                        labelColor="#D4C2FF"
                                        options={[
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
                                        ]}
                                        onChangeValue={value => setTime(value)}
                                    />
                                </View>
                            </View>
                        </View>
                    )
                }
            </PageHeader>


            {teachers.length != 0 &&
                <FlatList
                    style={styles.teacherList}
                    data={teachers}
                    keyExtractor={(item) => String(item.id_class)}
                    renderItem={({ item }) => <TeacherItem teacher={item} isFavoritedClass={isFavorited(item)} />}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        isLoading ?
                            <ActivityIndicator style={styles.indicator} size={"large"} color={"#6A6180"} />
                            :
                            <Text style={styles.textEnd}>Estes são todos os resultados</Text>
                    }
                />}
        </View>
    )
}