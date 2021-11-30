import { Link } from 'react-router-dom'

import backSvg from '../assets/icons/back.svg'

import Button from '../components/Button'
import FloatingLabel from '../components/FloatingLabel'
import ProffyElement from '../components/ProffyElement'

import '../styles/ForgotPassword.css'
import {useHistory} from 'react-router-dom'

function ForgotPassword() {

    const history = useHistory();

    function resetCredentials() {
        history.push('/success-reset-credentials')
    }

    return (
        <div className="forgot-password-area">
            <main>
                <div className="relative">
                    <Link to="/" className="back-link"><img src={backSvg} alt="Voltar ao início" /></Link>
                    <h1>Eita, esqueceu sua senha?</h1>
                    <p>Não esquenta, vamos dar um geito nisso.</p>
                    <form onSubmit={resetCredentials}>
                        <FloatingLabel label="E-mail" type="text" placeholder="E-mail" />
                        <Button text="Enviar" />
                    </form>
                </div>
            </main>
            <ProffyElement />
        </div>
    )
}

export default ForgotPassword