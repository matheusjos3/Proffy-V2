
import { Link } from 'react-router-dom';

import logo from '../assets/logo.svg';
import back from '../assets/icons/back.svg';
import camera from '../assets/icons/camera.svg';
import Textarea from '../components/Textarea'
import Input from '../components/Input'
import Select from '../components/Select'

import warningIcon from '../assets/icons/warning.svg';
import '../styles/Profile.css'

function Profile() {

    return (
        <div id="page-teacher">
            <header className="page-header">
                <div className="page-header-top">
                    <div className="page-header-top-content container">
                        <Link to="/">
                            <img src={back} alt="Ícone de voltar" />
                        </Link>
                        <span>Meu Perfil</span>
                        <img src={logo} alt="Proffy" />
                    </div>
                </div>

                <div className="page-header-content container">
                    <div className="image-profile-area">
                        <img src="https://avatars.githubusercontent.com/u/45835795?v=4" alt="Plataforma de estudos" />
                        <button type='button'>
                            <img src={camera} alt="Ícone de câmera" />
                        </button>
                    </div>
                    <span>Matheus José</span>
                    <p>Geografia</p>
                </div>
            </header>

            <main>
                <form>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <div className='input-grid'>
                            <Input
                                name='name'
                                label='Nome'
                            />

                            <Input
                                name='last_name'
                                label='Sobrenome'
                            />
                        </div>

                        <div className='input-grid2'>
                            <Input
                                name='email'
                                label='E-mail'
                            />

                            <Input
                                name='whastapp'
                                label='Whatsapp'
                            />
                        </div>

                        <Textarea
                            name='bio'
                            label='Biografia'
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div className='input-grid2'>
                            <Select
                                name="week_day"
                                label="Matéria"
                                placeholder="Selecione qual você quer ensinar"
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
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                            <button>+ Novo horário</button>
                        </legend>

                        <div className="schedule-item">
                            <Select
                                name='week_day'
                                label="Dia da semana"
                                placeholder="Selecione o dia"
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
                                type="time" />

                            <Input
                                name="to"
                                label="Até"
                                type="time" />
                        </div>

                        <div className="separator"><button>Excluir horário</button></div>
                    </fieldset>
                </form>
                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso inportante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">Salvar cadastro</button>
                </footer>
            </main>
        </div>
    )
}

export default Profile