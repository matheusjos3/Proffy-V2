import { useCallback, useEffect, useRef, useState } from 'react';
import api from '../services/api';

import TeacherItem, { Teacher } from '../components/TeacherItem';
import PageHeader from '../components/PageHeader';
import smileIcon from '../assets/icons/smile.svg';
import Loading from '../components/Loading';
import CustomSelect from '../components/CustomSelect';

import '../styles/TeacherList.css'

function TeacherList() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    const [countTeachers, setCountTeachers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const observer = useRef<IntersectionObserver>()
    const hasMore = useRef({ value: false })

    const lastElement = useCallback(node => {
        if (observer.current) {
            observer.current.disconnect()
        }

        observer.current = new IntersectionObserver((entities) => {
            if (entities[0].isIntersecting && hasMore) {
                setCurrentPage(page => page + 1)
            }
        })

        if (node) observer.current.observe(node)
    }, [hasMore])

    useEffect(() => {
        async function getMoreTeachers() {
            if (subject !== '' && week_day !== '' && time !== '') {

                await api('/classes', { params: { subject, week_day, time, page: currentPage } })
                    .then(response => {
                        setTeachers(prev => prev.concat(response.data))

                        if (response.data.length === 0) {
                            hasMore.current.value = false
                        }
                    })
            }
        }
        getMoreTeachers();
    }, [currentPage]);

    useEffect(() => {
        async function searchTeachers() {
            if (subject !== '' && week_day !== '' && time !== '') {

                setTeachers([])

                await api('/classes', { params: { subject, week_day, time, page: 1 } })
                    .then(response => {
                        setTeachers(response.data)
                        hasMore.current.value = true
                    })
            }
        }

        searchTeachers();
    }, [subject, week_day, time]);

    useEffect(() => {
        async function getNumberOfClasses() {
            await api.get('/count-classes')
                .then(res => {
                    setCountTeachers(res.data.total)
                })
                .catch(() => setCountTeachers(0))
        }

        getNumberOfClasses()
    }, [])

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader
                title='Estes são os proffys disponíveis.'
                src={smileIcon}
                alt='Ilustração de emoji sorrindo'
                styleInfo='info-study-text'
                paragraph={`Nós temos ${countTeachers} professores.`}
                styleHeader='header-row'
            >
                <form id="search-teachers" >
                    <CustomSelect
                        label="Matéria"
                        value={subject}
                        placeholder='Selecione'
                        onChangeValue={(v) => setSubject(v)}
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
                        ]} />
                    <CustomSelect
                        label="Dia da semana"
                        value={week_day}
                        placeholder='Selecione'
                        onChangeValue={(v) => setWeekDay(v)}
                        options={[
                            { value: '0', label: 'Segunda-feira' },
                            { value: '1', label: 'Terça-feira' },
                            { value: '2', label: 'Quarta-feira' },
                            { value: '3', label: 'Quinta-feira' },
                            { value: '4', label: 'Sexta-feira' },
                        ]}
                    />
                    <CustomSelect
                        label="Hora"
                        value={time}
                        placeholder='Selecione'
                        onChangeValue={(v) => setTime(v)}
                        options={[
                            { value: '6:00', label: '6h' },
                            { value: '7:00', label: '7h' },
                            { value: '8:00', label: '8h' },
                            { value: '9:00', label: '9h' },
                            { value: '10:00', label: '10h' },
                            { value: '11:00', label: '11h' },
                            { value: '12:00', label: '12h' },
                            { value: '13:00', label: '13h' },
                            { value: '14:00', label: '14h' },
                            { value: '15:00', label: '15h' },
                            { value: '16:00', label: '16h' },
                            { value: '17:00', label: '17h' },
                            { value: '18:00', label: '18h' },
                            { value: '19:00', label: '19h' },
                            { value: '20:00', label: '20h' },
                            { value: '21:00', label: '21h' },
                            { value: '22:00', label: '22h' },
                            { value: '23:00', label: '23h' }
                        ]} />
                </form>
            </PageHeader>

            <main>
                {teachers.length <= 0 &&
                    <div className='empty-list'>
                        <p>Nenhum professor encontrado com sua pesquisa.</p>
                    </div>
                }

                {teachers.length > 0 &&
                    <div className='teacher-list'>
                        {
                            teachers.map((teacher: Teacher) => {
                                return (
                                    <TeacherItem key={teacher.id_class} teacher={teacher} />
                                )
                            })
                        }
                        <div ref={lastElement}>
                            {hasMore.current.value ? <Loading color='#6A6180' /> : <p>Estes são todos os resultados</p>}
                        </div>
                    </div>
                }
            </main>

        </div>
    )
}

export default TeacherList;