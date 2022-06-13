import SuccessInfo from "../components/SuccessInfo";

function SuccessCreateAccount() {
    return (
        <SuccessInfo
            title="Cadastro concluído"
            description="Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência."
            buttonText="Fazer login"
            descriptionWidth="w-370"
            url="/login"
        />
    )
}

export default SuccessCreateAccount