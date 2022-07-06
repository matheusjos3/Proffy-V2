import { FormEvent, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import api from '../services/api';

import Toast from '../components/Toast';
import Button from '../components/Button';
import FloatingLabel from '../components/FloatingLabel';
import ProffyElement from '../components/ProffyElement';

import backSvg from '../assets/icons/back.svg';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
    const { addMessage } = useToast()
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [isSendingMail, setIsSendingMail] = useState(false)

    async function resetCredentials(e: FormEvent) {
        e.preventDefault()

        setIsSendingMail(true)

        await api.post('/forgot_password', { email })
            .then(() => {
                history.push('/success-reset-credentials')
                setIsSendingMail(false)
            })
            .catch(res => {
                addMessage({ message: res.response.data.erro, type: 'Error' })
                setIsSendingMail(false)
            })
    }

    return (
        <div className="forgot-password-area">
            <main>
                <div className="relative">
                    <Link to="/" className="back-link"><img src={backSvg} alt="Voltar ao início" /></Link>

                    <h1>Eita, esqueceu sua senha?</h1>
                    <p>Não esquenta, vamos dar um geito nisso.</p>

                    <form onSubmit={resetCredentials}>
                        <FloatingLabel label="E-mail" type="text" placeholder="E-mail" onChange={event => setEmail(event.target.value)} />
                        <Button text="Enviar" isLoading={isSendingMail} isDisabled={isSendingMail} />
                    </form>
                </div>
                <Toast />
            </main>
            <ProffyElement />
        </div>
    )
}

export default ForgotPassword