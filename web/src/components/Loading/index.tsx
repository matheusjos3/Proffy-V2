import { CircleNotch } from 'phosphor-react';
import './style.css';

interface LoadingProps {
    color: string;
}

function Loading({ color }: LoadingProps) {
    return (
        <div >
            <CircleNotch size={20} color={color} className='loading-animation' />
        </div>
    )
}

export default Loading