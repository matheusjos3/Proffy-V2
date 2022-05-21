import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import heartSvg from '../assets/icons/purple-heart.svg';
import eyeOnSvg from '../assets/icons/eye.svg';
import eyeOffSvg from '../assets/icons/eye_off.svg';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import FloatingLabel from '../components/FloatingLabel';
import Button from '../components/Button';
import ProffyElement from '../components/ProffyElement'
import Toast from '../components/Toast';
import '../styles/Login.css'

function Login() {
    const { signIn } = useAuth()
    const { addMessage } = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false)
    const [isValidatingLogin, setIsValidatingLogin] = useState(false)

    const tooglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const toogleRemember = () => {
        setRemember(!remember)
    }

    async function hanleLogin(event: FormEvent) {
        event.preventDefault()

        setIsValidatingLogin(true)

        try {
            await signIn({ email, password, remember })
            setIsValidatingLogin(false)
        } catch (error: any) {
            if (error.response.status === 400) {
                addMessage({ message: error.response.data, type: 'Error' })
            }

            setIsValidatingLogin(false)
        }
    }

    return (
        <div className="login-page">
            <ProffyElement />
            <main>
                <div className="login-area">
                    <h1>Fazer login</h1>

                    <form onSubmit={hanleLogin}>

                        <div className="input-group">
                            <FloatingLabel
                                type="text"
                                label="E-mail"
                                placeholder="E-mail"
                                onChange={e => setEmail(e.target.value)}
                            />

                            <FloatingLabel
                                type={passwordShown ? 'text' : 'password'}
                                label="Senha"
                                placeholder="Senha"
                                onChange={e => setPassword(e.target.value)}
                            >
                                <button type="button" onClick={tooglePassword} >
                                    <img src={passwordShown ? eyeOffSvg : eyeOnSvg} alt="Visibilidade da senha" />
                                </button>
                            </FloatingLabel>
                        </div>

                        <div className="login-options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember-me" onClick={toogleRemember} />
                                <label htmlFor="remember-me">Lembrar-me</label>
                            </div>
                            <Link to="/forgot-password">Esqueci minha senha</Link>
                        </div>

                        <Button
                            type="submit"
                            text="Entrar"
                            isLoading={isValidatingLogin}
                            isDisabled={email.length === 0 || password.length === 0 || isValidatingLogin}
                        />
                    </form>

                    <div className="login-footer">
                        <p>Não tem conta? <Link className="open-form" to="/create-account">Cadastre-se</Link></p>
                        <p>É de graça <img src={heartSvg} alt="É de graça" /></p>
                    </div>
                </div>

                <Toast />
            </main>
        </div>
    )
}

export default Login;