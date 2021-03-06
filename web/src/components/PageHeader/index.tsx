import { Link } from "react-router-dom";

import logoImg from '../../assets/logo.svg';
import backIcon from '../../assets/icons/back.svg';
import './style.css'

interface pageHeaderProps {
    title: string;
    description?: string;
    src: string;
    alt: string;
    styleHeader: 'header-column' | 'header-row'
    styleInfo: 'info-form-text' | 'info-study-text';
    paragraph: string
}

const PageHeader: React.FC<pageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <div className="top-bar-content">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar" />
                    </Link>
                    <span>Dar aulas</span>
                    <img src={logoImg} alt="Proffy" />
                </div>
            </div>

            <div className="header-content">
                <div className={`header-title ${props.styleHeader}`}>
                    <strong>{props.title}</strong>
                    {props.description && <p>{props.description}</p>}
                    <div className={props.styleInfo}>
                        <img src={props.src} alt={props.alt} />
                        <p>{props.paragraph}</p>
                    </div>
                </div>
                {props.children}
            </div>
        </header>
    )
}

export default PageHeader