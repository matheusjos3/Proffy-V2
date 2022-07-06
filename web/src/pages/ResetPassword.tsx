import { FormEvent, useState } from "react";
import { useQuery } from "../hooks/useQuery";

import Button from "../components/Button";
import Input from "../components/Input";

import '../styles/ResetPassword.css'
import api from "../services/api";
import { useHistory } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import Toast from "../components/Toast";

function ResetPassword() {
    const query = useQuery()
    const history = useHistory()
    const { addMessage } = useToast()
    const [password, setPassword] = useState('')
    const [comfirmPassword, setComfirmPassword] = useState('')
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    async function handleResetPassoword(e: FormEvent) {
        e.preventDefault()

        setIsChangingPassword(true)

        if (password === '' && comfirmPassword === '') {
            setIsChangingPassword(false)
            return
        }

        if (password !== comfirmPassword) {
            setIsChangingPassword(false)
            return alert('Senhas não são iguais')
        }

        await api.put('/reset_password', { password, token: query.get("token") })
            .then(() => {
                history.push('/login')
            })
            .catch(error => {
                setIsChangingPassword(false)
                addMessage({ message: error.response.data.error, type: 'Error' })
            })
    }

    return (
        <div className="reset-password-container">
            <form onSubmit={handleResetPassoword}>
                <h1>Redefinir senha</h1>

                <Input
                    label="Nova senha"
                    value={password}
                    name="password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />

                <Input
                    label="Confirmar senha"
                    value={comfirmPassword}
                    name="comfirm_password"
                    type="password"
                    onChange={e => setComfirmPassword(e.target.value)}
                />

                <Button text="Mudar senha" type="submit" isLoading={isChangingPassword} isDisabled={isChangingPassword} />
            </form>
            <Toast />
        </div>
    )
}

export default ResetPassword;