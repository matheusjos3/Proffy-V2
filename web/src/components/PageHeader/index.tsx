import { Link } from "react-router-dom";

import logo from '../../assets/logo.svg';
import back from '../../assets/icons/back.svg';
import './style.css'

interface HeaderProps{
    title: string
}

function PageHeader({title} : HeaderProps) {
    return (
        <header className="container">
            <Link to="/landing">
                <img src={back} alt="Ícone de voltar" />
            </Link>
            <span>{title}</span>
            <img src={logo} alt="Proffy" />
        </header>
    )
}

export default PageHeader