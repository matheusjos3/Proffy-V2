import PageHeader from '../components/PageHeader';
import '../styles/TeacherForm.css'
import rocketIcon from '../assets/icons/rocket.svg';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import warningIcon from '../assets/icons/warning.svg';

function TeacherForm() {
    return (
        <div id="page-teacher-form" className='container'>
            <PageHeader
                title='Que incrível que você quer dar aulas.'
                description='O primeiro passo, é preencher esse formulário de inscrição.'
                src={rocketIcon}
                alt='Ilustração de foquete'
                style='form-give-classes'
                paragraphOne='Prepare-se!'
                paragraphTwo='vai ser o máximo.'
            />

            <main>
                <form>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <div className="form-user-info">
                            <img src="https://avatars.githubusercontent.com/u/45835795?v=4" alt="Plataforma de estudos" />
                            <span>Matheus josé</span>
                            <Input
                                label='Whatsapp'
                                name='whatsapp'
                            />
                        </div>

                        <Textarea
                            name='bio'
                            label='Biografia'
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div className='teacher-form-input-grid'>
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
                        <legend>
                            Horários disponíveis <button>+ Novo horário</button>
                        </legend>

                        <div className="schedule-item">
                            <Select
                                name="week_day"
                                label='Máteria'
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