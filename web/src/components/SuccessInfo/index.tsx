import { Link } from 'react-router-dom';

import successIconSvg from '../../assets/icons/success-check-icon.svg'
import './style.css';

interface SuccessProps {
    title: string,
    description: string,
    buttonText: string,
    descriptionWidth: string;
    url: string
}

function SuccessInfo({ title, description, buttonText, descriptionWidth, url }: SuccessProps) {
    return (
        <div className="bg-primary-flex">
            <div className='bg-image-flex'>
                <img src={successIconSvg} alt="Icone de sucesso" />
                <h1>{title}</h1>
                <p className={descriptionWidth}>{description}</p>
                <Link to={url} className="back-button">{buttonText}</Link>
            </div>
        </div>
    )
}

export default SuccessInfo