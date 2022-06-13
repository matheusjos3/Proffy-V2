import SuccessInfo from "../components/SuccessInfo";

function SuccessForgotPassword() {
    return (
        <SuccessInfo
            title="Redefinição enviada!"
            description="Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos."
            buttonText="Voltar ao login"
            descriptionWidth="w-480"
            url="/login"
        />
    )
}

export default SuccessForgotPassword