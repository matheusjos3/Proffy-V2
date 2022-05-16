import loadingIcon from '../../assets/icons/circle-notch-bold.svg'
import './style.css';

function Loading() {
    return (
        <div className='loading-style'>
            <img src={loadingIcon} alt="Imagem de carregamento" />
        </div>
    )
}

export default Loading