import whatsappIcon from '../../assets/icons/whatsapp.svg';
import defaultAvatar from '../../assets/default-avatar.svg';
import { convertMinutesToHoursInt } from '../../utils/convertMinutesToHours';
import toReal from '../../utils/formatMoney';
import './style.css';

export interface Teacher {
    avatar: string;
    bio: string;
    cost: number
    id_class: number
    name: string;
    subject: string;
    whatsapp: string;
    schedules: ScheduleItem[]
}

interface ScheduleItem {
    id: number,
    week_day: number;
    from: number;
    to: number;
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']

    return (
        <article className="teacher-item">
            <header>
                {
                    teacher.avatar !== ''
                        ?
                        <img src={teacher.avatar} alt={teacher.name} />
                        :
                        <img src={defaultAvatar} alt={teacher.name} />
                }

                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <div className="schedule">

                {
                    days.map((day, index) => {
                        const available = teacher.schedules.find(
                            classes => classes.week_day === index
                        )

                        if (available) {
                            return (
                                <div className="schedule-day" key={index}>
                                    <span>Dia</span>
                                    <strong>{day}</strong>
                                    <span>Horário</span>
                                    <strong>
                                        {`
                                            ${convertMinutesToHoursInt(available.from)}h
                                             - 
                                            ${convertMinutesToHoursInt(available.to)}h`}
                                    </strong>
                                </div>
                            )
                        } else {
                            return (
                                <div className="schedule-day" style={{ opacity: 0.4 }} key={index}>
                                    <span>Dia</span>
                                    <strong>{day}</strong>
                                    <span>Horário</span>
                                    <strong>-</strong>
                                </div>
                            )
                        }
                    })
                }
            </div>

            <footer>
                <p>Preço/Hora <strong>{toReal(teacher.cost)}</strong></p>
                <a target='_blank'
                    href={`https://wa.me/${teacher.whatsapp}`}
                    rel="noreferrer noopener">
                    <img src={whatsappIcon} alt="Entrar em contato" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem