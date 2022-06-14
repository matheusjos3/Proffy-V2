import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import back from '../assets/icons/back.svg';
import camera from '../assets/icons/camera.svg';
import Textarea from '../components/Textarea'
import Input from '../components/Input'
import Select from '../components/Select'
import warningIcon from '../assets/icons/warning.svg';
import defaultAvatar from '../assets/default-avatar.svg';

import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Toast from '../components/Toast'
import { convertMinutesToHours } from '../utils/convertMinutesToHours';
import { getLocalStorageUser } from '../utils/storage';
import '../styles/Profile.css'

interface ScheduleItem {
    id: number;
    week_day: number;
    from: number;
    to: number;
}

function Profile() {
    const { addMessage } = useToast()
    const { user } = useAuth()
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubjec] = useState('');
    const [cost, setCost] = useState('');
    const [scheduleItems, setSchedulesItems] = useState<Array<ScheduleItem>>([]);
    const [isTeacher, setIsTeacher] = useState(false)
    const [class_id, setClassId] = useState(0)


    useEffect(() => {
        async function getUserData() {
            const storageUser = getLocalStorageUser()
            await api.get('/user', { params: { user_id: storageUser.id } })
                .then(res => {
                    setName(res.data.user.name)
                    setLastName(res.data.user.last_name)
                    setEmail(res.data.user.email)
                    setWhatsapp(res.data.user.whatsapp || '')
                    setBio(res.data.user.bio)
                    setAvatar(res.data.user.avatar || '')

                    if (res.data.classes) {
                        setIsTeacher(true)
                        setSubjec(res.data.classes.subject)
                        setCost(res.data.classes.cost)
                        setSchedulesItems(res.data.schedules.map((item: ScheduleItem) => (
                            {
                                id: item.id,
                                week_day: item.week_day,
                                from: convertMinutesToHours(item.from),
                                to: convertMinutesToHours(item.to)
                            }
                        )))
                        setClassId(res.data.classes.id)
                    }
                })
        }

        getUserData()
    }, [])

    async function addNewScheduleItem() {
        if (scheduleItems.length <= 4) {
            await api.post('/schedule', { class_id, week_day: 0, from: 0, to: 0 })
                .then(res => {
                    setSchedulesItems([
                        ...scheduleItems,
                        { id: res.data.id, week_day: 0, from: 0, to: 0 }
                    ])
                })
                .catch(err => addMessage({ message: err.response.data.message, type: 'Error' }))
        }
    }

    async function removeScheduleItem(id: number) {
        await api.delete('/schedule', { data: { id } })
            .then(res => {
                addMessage({ message: res.data.message, type: 'Success' })

                setSchedulesItems(scheduleItems => scheduleItems.filter(item => item.id !== id))
            })
            .catch(err => addMessage({ message: err.response.data.message, type: 'Error' }))
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })

        setSchedulesItems(updateScheduleItems)
    }

    function handleUpdateUser(e: FormEvent) {
        e.preventDefault()

        const data = { user_id: user?.id, name, email, last_name: lastName, avatar: '', bio, whatsapp, subject, cost, schedule: scheduleItems }

        api.put('/user', data)
            .then(res => addMessage({ message: res.data.message, type: 'Success' }))
            .catch(res => addMessage({ message: res.response.data.message, type: 'Error' }))
    }

    return (
        <div id="page-teacher">

            <header className="page-profile-header">
                <div className="top-bar-profile-container">
                    <div className="top-bar-profile-content">
                        <Link to="/">
                            <img src={back} alt="Voltar" />
                        </Link>
                        <span>Dar aulas</span>
                        <img src={logo} alt="Proffy" />
                    </div>
                </div>

                <div className="header-profile-content">
                    <div className="background-container">
                        <div className="profile-info">
                            <div className="image-profile-area">
                                <img src={avatar !== '' ? avatar : defaultAvatar} alt="Plataforma de estudos" />
                                <button type='button'>
                                    <img src={camera} alt="Ícone de câmera" />
                                </button>
                            </div>
                            <span>{`${name} ${lastName}`}</span>
                            <p>{subject !== '' ? subject : 'Sem informação'}</p>
                        </div>
                    </div>
                </div>

            </header >

            <main>
                <form onSubmit={handleUpdateUser}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <div className='input-grid'>
                            <Input
                                name='name'
                                label='Nome'
                                type={'text'}
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />

                            <Input
                                name='last_name'
                                label='Sobrenome'
                                type={'text'}
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value) }}
                            />
                        </div>

                        <div className='input-grid2'>
                            <Input
                                name='email'
                                label='E-mail'
                                value={email}
                                type={'email'}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <Input
                                name='whastapp'
                                label='Whatsapp'
                                type={'text'}
                                value={whatsapp}
                                onChange={(e) => { setWhatsapp(e.target.value) }}
                            />
                        </div>

                        <Textarea
                            name='bio'
                            label='Biografia'
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    {isTeacher &&
                        <fieldset>
                            <legend>Sobre a aula</legend>

                            <div className='input-grid2'>
                                <Select
                                    name="subject"
                                    label="Matéria"
                                    value={subject}
                                    onChange={(e) => setSubjec(e.target.value)}
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

                                <Input
                                    name='cost'
                                    label='Custo da sua hora por aula'
                                    value={cost}
                                    onChange={(e) => { setCost(e.target.value) }}
                                />
                            </div>
                        </fieldset>
                    }

                    {isTeacher &&
                        <fieldset>
                            <legend>Horários disponíveis
                                <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                            </legend>

                            {scheduleItems.map((scheduleItem, index) => {
                                return (
                                    <div key={scheduleItem.id}>
                                        <div className="schedule-item">
                                            <Select
                                                name='week_day'
                                                label="Dia da semana"
                                                value={scheduleItem.week_day}
                                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                                options={[
                                                    { value: '0', label: 'Segunda-feira' },
                                                    { value: '1', label: 'Terça-feira' },
                                                    { value: '2', label: 'Quarta-feira' },
                                                    { value: '3', label: 'Quinta-feira' },
                                                    { value: '4', label: 'Sexta-feira' },
                                                ]}
                                            />

                                            <Input
                                                name="from"
                                                label="Das"
                                                type="time"
                                                value={scheduleItem.from}
                                                onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                            />

                                            <Input
                                                name="to"
                                                label="Até"
                                                type="time"
                                                value={scheduleItem.to}
                                                onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                                        </div>

                                        <div className="separator">
                                            <button type="button" onClick={() => removeScheduleItem(scheduleItem.id)}>
                                                Excluir horário
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}

                        </fieldset>
                    }

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso inportante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
            <Toast />
        </div >
    )
}

export default Profile