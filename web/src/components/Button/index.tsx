import './style.css';

interface ButtonProps {
    text: string;
    type?: 'submit';
    isDisabled?: boolean
}

function Button({type, text, isDisabled} : ButtonProps) {
    return(
        <button type={type} className="btn" disabled={isDisabled}>
            {text}
        </button>
    );
}

export default Button;