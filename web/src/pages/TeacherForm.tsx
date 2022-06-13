import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../components/PageHeader';
import rocketIcon from '../assets/icons/rocket.svg';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import warningIcon from '../assets/icons/warning.svg';
import defaultAvatar from '../assets/default-avatar.svg';

import api from '../services/api';
import { getLocalStorageUser } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';
import '../styles/TeacherForm.css'
import { useToast } from '../contexts/ToastContext';

function TeacherForm() {
    const history = useHistory()
    const { user } = useAuth();
    const { addMessage } = useToast()
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' },
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updataScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        });

        setScheduleItems(updataScheduleItems);
    }

    useEffect(() => {
        async function getUserData() {
            const storageUser = getLocalStorageUser()
            await api.get('/user', { params: { user_id: storageUser.id } })
                .then(res => {
                    setName(`${storageUser.name} ${storageUser.last_name}`)
                    setWhatsapp(res.data.user.whastapp || '')
                    setBio(res.data.user.bio)
                    setAvatar(storageUser.avatar)
                })
        }
        getUserData()
    }, [])

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        const user_id = user?.id

        api.post('/classes', { user_id, whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems })
            .then(() => {
                history.push('/success-create-class');
            }).catch(err => addMessage({ message: err.response.data.message, type: 'Error' }))
    }

    return (
        <div id="page-teacher-form" className='container'>
            <PageHeader
                title='Que incrível que você quer dar aulas.'
                description='O primeiro passo, é preencher esse formulário de inscrição.'
                src={rocketIcon}
                alt='Ilustração de foquete'
                styleInfo='info-form-text'
                paragraph='Prepare-se! vai ser o máximo.'
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <div className="form-user-info">
                            <img src={avatar !== '' ? avatar : defaultAvatar} alt="Plataforma de estudos" />
                            <span>{`${name}`}</span>
                            <Input
                                label='Whatsapp'
                                name='whatsapp'
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

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div className='teacher-form-input-grid'>
                            <Select
                                name="subjec"
                                label="Matéria"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
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

                    <fieldset>
                        <legend>
                            Horários disponíveis <button type='button' onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={index} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label='Máteria'
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sabado' },
                                        ]}
                                    />

                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                                </div>
                            )
                        })}
                    </fieldset>

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
        </div>
    )
}

export default TeacherForm;