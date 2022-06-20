import { FormEvent, useState } from 'react';

import PageHeader from '../components/PageHeader';
import smileIcon from '../assets/icons/smile.svg';

import Select from '../components/Select';
import Input from '../components/Input';
import TeacherItem, { Teacher } from '../components/TeacherItem';
import api from '../services/api';
import '../styles/TeacherList.css'

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        await api('/classes', { params: { subject, week_day, time } })
            .then(response => setTeachers(response.data))
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader
                title='Estes são os proffys disponíveis.'
                src={smileIcon}
                alt='Ilustração de emoji sorrindo'
                styleInfo='info-study-text'
                paragraph='Nós temos 32 professores.'
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
                                return <TeacherItem key={teacher.id_class} teacher={teacher} />
                            })
                        }
                        <p>Estes são todos os resultados</p>
                    </div>
                }
            </main>

        </div>
    )
}

export default TeacherList;