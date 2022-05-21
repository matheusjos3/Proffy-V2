import { CheckCircle, Info, WarningCircle, X } from "phosphor-react";
import { useEffect } from "react";
import { ToastMessageData, useToast } from "../../contexts/ToastContext";
import './style.css'

function Toast() {
    const { messages, removeMessage } = useToast()

    const typeIcon = {
        Success: <CheckCircle size={24} color="#04D361" weight="bold" />,
        Error: <WarningCircle size={24} color="#E20100" weight="bold" />,
        Info: <Info size={24} color="#8257E5" weight="bold" />
    }

    function handleCloseToast(id: string) {
        removeMessage(id)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (messages.length) {
                removeMessage(messages[0].id);
            }
        }, 4000);
        return () => {
            clearTimeout(timer);
        };
    }, [messages, removeMessage]);

    return (
        <div>
            {
                <div className="toast-container">
                    {messages.map(({ id, message, type }: ToastMessageData, index) => (
                        <div key={index} className={`notification`}>
                            <div className="toast-icon">
                                {typeIcon[type]}
                            </div>
                            <div className="toast-text">
                                <span>{type}</span>
                                <p>{message}</p>
                            </div>
                            <button type="button" onClick={() => handleCloseToast(id)}><X color="#9C98A6" weight="bold" size={16} /></button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Toast