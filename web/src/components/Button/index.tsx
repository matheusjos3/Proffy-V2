import Loading from '../Loading';
import './style.css';

interface ButtonProps {
    text: string;
    type?: 'submit';
    isDisabled?: boolean;
    isLoading?: boolean
}

function Button({ type, text, isDisabled, isLoading }: ButtonProps) {
    return (
        <button type={type} className="btn" disabled={isDisabled}>
            {isLoading ? <Loading color='#ffffff' /> : text}
        </button>
    );
}

export default Button;