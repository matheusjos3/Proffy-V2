import React, { createContext, useContext, useState } from "react";
import { v4 } from 'uuid'

export interface ToastMessageData {
    id: string;
    message: string;
    type: 'Success' | 'Error' | 'Info';
}

interface ToastContextData {
    messages: ToastMessageData[];
    addMessage: (data: Omit<ToastMessageData, 'id'>) => void
    removeMessage: (id: string) => void
}

export const ToastContext = createContext({} as ToastContextData)

export const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMesseges] = useState<ToastMessageData[]>([])

    function addMessage({ message, type }: Omit<ToastMessageData, 'id'>) {
        const toast = {
            id: v4(),
            message,
            type
        }

        setMesseges((state) => [...state, toast])
    }

    function removeMessage(id: string) {
        setMesseges(messages.filter(message => message.id !== id))
    }

    return (
        <ToastContext.Provider value={{ messages, addMessage, removeMessage }}>
            {children}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    return context
}