import './style.css';

import successIconSvg from '../../assets/icons/success-check-icon.svg'
import { Link } from 'react-router-dom';

interface SuccessProps {
    title: string,
    description: string,
    buttonText: string,
    descriptionWidth: string
}

function SuccessInfo({ title, description, buttonText, descriptionWidth}: SuccessProps) {
    return (
        <div className="bg-primary-flex">
            <div className='bg-image-flex'>
                <img src={successIconSvg} alt="Icone de sucesso" />
                <h1>{title}</h1>
                <p className={descriptionWidth}>{description}</p>
                <Link to="/" className="back-button">{buttonText}</Link>
            </div>
        </div>
    )
}

export default SuccessInfo