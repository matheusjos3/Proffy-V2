import { Link } from 'react-router-dom';

import logoSvg from '../assets/logo.svg';
import landingSvg from '../assets/landing.svg'
import logoutSvg from '../assets/icons/logout.svg'
import purpleHeartIcon from '../assets/icons/purple-heart.svg'
import studyIcon from '../assets/icons/study.svg';
import giveClassIcon from '../assets/icons/give-classes.svg';
import defaultAvatar from '../assets/default-avatar.svg'
import { useAuth } from '../contexts/AuthContext';
import '../styles/Landing.css'

function Landing() {
    const { signOut, user } = useAuth()

    function handleLogout() {
        signOut()
    }

    return (
        <div id="page-landing">

            <header className="page-landing-header">
                <div className="container">
                    <div className="page-landing-header-top">
                        <Link to="/profile" className='page-landing-header-profile'>
                            <img src={user?.avatar ? user.avatar : defaultAvatar} alt="Plataforma de estudos" />
                            <p>{`${user?.name} ${user?.last_name}`}</p>
                        </Link>

                        <button type='button' onClick={handleLogout} className="btn-logout"><img src={logoutSvg} alt='Ícone de desligar' /></button>
                    </div>
                    <div className="page-landing-header-image">
                        <div className="logo-container-landing">
                            <img src={logoSvg} alt="Proffy" />
                            <h2>Sua plataforma de estudos online.</h2>
                        </div>

                        <img src={landingSvg} alt="Plataforma de estudos" className="hero-image" />
                    </div>
                </div>
            </header>

            <section className='section-below container'>
                <div className='section-below-welcome'>
                    <p>Seja bem-vindo.</p>
                    <span>O que deseja fazer?</span>
                </div>
                <span className="total-connections">
                    Total de 200 conexões já realizadas
                    <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>

                <div className='buttons-container'>
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassIcon} alt="Estudar" />
                        Dar aula
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Landing