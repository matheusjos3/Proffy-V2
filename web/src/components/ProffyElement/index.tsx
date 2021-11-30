import logoSvg from '../../assets/intro.svg';
import './style.css'

function ProffyElement() {
    return (
        <aside className="proffy-area">
            <div className="proffy-background-flex">
                <div className="logo-container">
                    <img src={logoSvg} alt="Proffy" />
                </div>
            </div>
        </aside>
    )
}

export default ProffyElement;