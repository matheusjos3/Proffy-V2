import React, { useState } from 'react';

import './style.css';

interface SelectProps {
    name: string;
    label: string;
    placeholder: string,
    changeValue?: (v: string) => void;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, placeholder }) => {

    const [selected, setSelected] = useState('')
    const [active, setActive] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const open = () => setIsOpen(!isOpen)

    function change(value: string, label: string) {
        // changeValue(value)
        setSelected(label)
        setActive(value)
    }

    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>

            <div 
                className={isOpen ? 'select open' : 'select'}
                onClick={open}
            >
                <div className="selected">
                    <input type="text" value={selected} placeholder={placeholder} readOnly />
                </div>

                <div className="options-container">
                    {options.map(option => (
                        <div key={option.value} className={`
                                ${active === option.value ? 'option active' : 'option'}
                            `}
                            onClick={() => change(option.value, option.label)}
                        >
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="select">
                <div className="selected">
                    <input type="text" value={selected} placeholder={placeholder} readOnly />
                </div>
                
            </div> */}
        </div>
    );
}

export default Select;