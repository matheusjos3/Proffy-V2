import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import backSvg from '../assets/icons/back.svg';
import eyeOnSvg from '../assets/icons/eye.svg';
import eyeOffSvg from '../assets/icons/eye_off.svg';

import FloatingLabel from '../components/FloatingLabel';
import Button from '../components/Button';
import ProffyElement from '../components/ProffyElement';

import '../styles/CreateAccount.css'

function CreateAccount() {
    const [passwordShown, setPasswordShown] = useState(false)
    const history = useHistory()

    const tooglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    function register(e: FormEvent) {
        e.preventDefault()
        history.push('/success-create-account')
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
                            />

                            <FloatingLabel
                                type="text"
                                label="Sobrenome"
                                placeholder="Sobrenome"
                            />

                            <FloatingLabel
                                type="text"
                                label="E-mail"
                                placeholder="E-mail"
                            />

                            <FloatingLabel
                                type={passwordShown ? 'text' : 'password'}
                                label="Senha"
                                placeholder="Senha"
                            >
                                <button type="button" onClick={tooglePassword} ><img src={passwordShown ? eyeOffSvg : eyeOnSvg} alt="Visibilidade da senha" /></button>
                            </FloatingLabel>
                        </div>

                        <Button type="submit" text="Concluir cadastro" />
                    </form>
                </div>
            </main>
            <ProffyElement />
        </div>
    )
}

export default CreateAccount;