import PageHeader from '../components/PageHeader';
import smileIcon from '../assets/icons/smile.svg';
import Select from '../components/Select';
import TeacherItem, { Teacher } from '../components/TeacherItem';
import { teacher } from '../utils/user';
import '../styles/TeacherList.css'

function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader
                title='Estes são os proffys disponíveis.'
                src={smileIcon}
                alt='Ilustração de emoji sorrindo'
                style='info-study-text'
                paragraph='Nós temos 32 professores.'
            >
                <form id="search-teachers">
                    <Select
                        name="week_day"
                        label="Matéria"
                        placeholder="Selecione"
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciência', label: 'Ciência' },
                            { value: 'Educação fisica', label: 'Ed fisica' },
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
                        placeholder="Selecione"
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

                    <Select
                        name="time"
                        label='Hórario'
                        placeholder="Selecione"
                        options={[
                            { value: '06:00', label: '6h' },
                            { value: '07:00', label: '7h' },
                        ]}
                    />
                </form>
            </PageHeader>

            <main>
                {teacher.length <= 0 &&
                    <div className='empty-list'>
                        <p>Nenhum professor encontrado com sua pesquisa.</p>
                    </div>
                }

                {teacher.length > 0 &&
                    <div className='teacher-list'>
                        {
                            teacher.map((teacher: Teacher) => {
                                return <TeacherItem key={teacher.id} teacher={teacher} />
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