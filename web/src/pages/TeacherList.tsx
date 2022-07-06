import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import api from '../services/api';
import TeacherItem, { Teacher } from '../components/TeacherItem';

import PageHeader from '../components/PageHeader';
import smileIcon from '../assets/icons/smile.svg';

import Select from '../components/Select';
import Input from '../components/Input';
import Loading from '../components/Loading';
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

    useEffect(() => {
        async function searchTeachers() {

            if (hasMore.current.value) {
                await api('/classes', { params: { subject, week_day, time, page: currentPage } })
                    .then(response => {
                        setTeachers(prev => prev.concat(response.data))

                        if (response.data.length === 0) {
                            hasMore.current.value = false
                        }
                    })
            }
        }

        searchTeachers()
    }, [currentPage, subject, week_day, time])

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

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();
        setTeachers([])

        await api('/classes', { params: { subject, week_day, time, page: 1 } })
            .then(response => {
                setTeachers(response.data)
                hasMore.current.value = true
            })
    }

    useEffect(() => {
        async function getNumberOfClasses() {
            await api.get('/count-classes')
                .then(res => {
                    setCountTeachers(res.data.total)
                })
                .catch(() => setCountTeachers(0))
        }

        getNumberOfClasses()
    })

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
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subjec"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
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
                    />

                    <Select
                        name="week_day"
                        label='Dia da semana'
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
                        options={[
                            { value: '0', label: 'Segunda-feira' },
                            { value: '1', label: 'Terça-feira' },
                            { value: '2', label: 'Quarta-feira' },
                            { value: '3', label: 'Quinta-feira' },
                            { value: '4', label: 'Sexta-feira' },
                        ]}
                    />

                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button type="submit">
                        Buscar
                    </button>
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