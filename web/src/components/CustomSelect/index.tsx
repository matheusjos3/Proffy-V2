import React, { useEffect, useState } from 'react';
import './style.css';

interface SelectProps {
    value: string;
    label: string;
    placeholder: string;
    onChangeValue: (v: string) => void;
    options: Array<{
        value: string;
        label: string;
    }>;
}

function CustomSelect({ label, options, value, placeholder, onChangeValue }: SelectProps) {
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [active, setActive] = useState('')
    const [selected, setSelected] = useState('')

    const toggleSelect = () => setIsSelectOpen(!isSelectOpen)

    function changeValues(value: string, label: string) {
        setActive(value)
        onChangeValue(value)
    }

    useEffect(() => {
        const labelArray = options.find(i => i.value === value)
        setSelected(labelArray !== undefined ? labelArray.label : '')
        setActive(labelArray !== undefined ? labelArray.value : '')
    }, [value])

    return (

        <div className="custom-select-block">
            <label htmlFor="name">{label}</label>
            <div className="custom-select" onClick={toggleSelect}>
                <div className={`${isSelectOpen ? 'select select-open' : 'select'}`}>
                    <div className="selected">
                        {selected === "" ?
                            <span className="select-placeholder">{placeholder}</span>
                            :
                            <span>
                                {selected}
                            </span>
                        }
                    </div>

                    <div className="select-options">
                        {
                            options.map(option => {
                                return (
                                    <div
                                        key={option.value}
                                        onClick={() => changeValues(option.value, option.label)}
                                        className={`${active === option.value ? 'option option-active' : 'option'}`}
                                    >
                                        <span>{option.label}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomSelect;