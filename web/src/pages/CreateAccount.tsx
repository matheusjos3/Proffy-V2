import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import backSvg from '../assets/icons/back.svg';
import eyeOnSvg from '../assets/icons/eye.svg';
import eyeOffSvg from '../assets/icons/eye_off.svg';

import FloatingLabel from '../components/FloatingLabel';
import Button from '../components/Button';
import ProffyElement from '../components/ProffyElement';

import '../styles/CreateAccount.css'
import api from '../services/api';
import { useToast } from '../contexts/ToastContext';
import Toast from '../components/Toast';

function CreateAccount() {
    const { addMessage } = useToast()
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false)
    const history = useHistory()

    const tooglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    async function register(e: FormEvent) {
        e.preventDefault()
        await api.post('/user', { name, last_name: lastName, email, password })
            .then(() => history.push('/success-create-account'))
            .catch(res => addMessage({ message: res.response.data.error, type: 'Error' }))
    }

    return (
        <div className="create-account-page">
            <main>
                <div className="create-account-area">
                    <Link className="back-link" to="/"><img src={backSvg} alt="Voltar ao início" /></Link>
                    <h1>Cadastro</h1>
                    <p>Preencha os dados abaixo para começar.</p>
                    <form onSubmit={register}>
                        <div className="input-group">
                            <FloatingLabel
                                type="text"
                                label="Nome"
                                placeholder="Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <FloatingLabel
                                type="text"
                                label="Sobrenome"
                                placeholder="Sobrenome"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <FloatingLabel
                                type="text"
                                label="E-mail"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <FloatingLabel
                                type={passwordShown ? 'text' : 'password'}
                                label="Senha"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                                <button type="button" onClick={tooglePassword} ><img src={passwordShown ? eyeOffSvg : eyeOnSvg} alt="Visibilidade da senha" /></button>
                            </FloatingLabel>
                        </div>

                        <Button type="submit" text="Concluir cadastro" />
                    </form>
                </div>
                <Toast />
            </main>
            <ProffyElement />
        </div>
    )
}

export default CreateAccount;