import { InputHTMLAttributes } from "react";

import './style.css'

interface FloatingLabelprops extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'password';
    label: string;
}

const FloatingLabel: React.FC<FloatingLabelprops> = ({ type, label, children, ...rest }) => {

    return (
        <div className="floating-label-block">
            <div className="floating-label">
                <input type={type} {...rest} />
                <label>{label}</label>
            </div>
            {children}
        </div>
    )
}

export default FloatingLabel;