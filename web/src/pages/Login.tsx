import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import heartSvg from '../assets/icons/purple-heart.svg';
import eyeOnSvg from '../assets/icons/eye.svg';
import eyeOffSvg from '../assets/icons/eye_off.svg';

import FloatingLabel from '../components/FloatingLabel';
import Button from '../components/Button';
import ProffyElement from '../components/ProffyElement'
import '../styles/Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false)
    const history = useHistory()

    const tooglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    function register(event: FormEvent) {
        event.preventDefault()

        history.push('/home')
    }

    return (
        <div className="login-page">
            <ProffyElement />
            <main>
                <div className="login-area">
                    <h1>Fazer login</h1>
                    <form onSubmit={register}>

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
                                <button type="button" onClick={tooglePassword} ><img src={passwordShown ? eyeOffSvg : eyeOnSvg} alt="Visibilidade da senha" /></button>
                            </FloatingLabel>
                        </div>

                        <div className="login-options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember-me" />
                                <label htmlFor="remember-me">Lembrar-me</label>
                            </div>
                            <Link to="/forgot-password">Esqueci minha senha</Link>
                        </div>

                        <Button type="submit" text="Entrar" isDisabled={email.length === 0 || password.length === 0} />
                    </form>

                    <div className="login-footer">
                        <p>Não tem conta? <Link className="open-form" to="/create-account">Cadastre-se</Link></p>
                        <p>É de graça <img src={heartSvg} alt="É de graça" /></p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;