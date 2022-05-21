import { CircleNotch } from 'phosphor-react';
import './style.css';

function Loading() {
    return (
        <div >
            <CircleNotch size={20} color="#ffffff" weight="bold" className='loading-animation' />
        </div>
    )
}

export default Loading