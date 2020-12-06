import './header.css'
import { Link } from 'react-router-dom'

function Header() {
    const menu = ['topics', 'Logo', 'Perfil']

    return (
        <div className="header">
            {menu.map(tabs =>
                <div
                    key={tabs}
                    className="tab"
                >
                    <Link to={`/${tabs}`}>{tabs}</Link>
                </div>
            )}
        </div>
    )
}

export default Header;