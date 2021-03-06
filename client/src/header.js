import './header.css'
import { Link } from 'react-router-dom'
import { useUser } from './usercontext';
import Account from './routes/users/register-login/login-menu';

function Header() {

    const me = useUser();

    if (!me) {
        return (
            <div className="header">
                <div className="tab">
                    <Link to="/topics">Temas</Link>
                </div>
                <div className="tab">
                    <Link to="/">Illuminare</Link>
                </div>
            </div >
        )
    }
    return (
        <div className="header">
            <div className="tab">
                <Link to="/topics">Temas</Link>
            </div>
            <div className="tab">
                <Link to="/">Illuminare</Link>
            </div>
            <div>
                <Account />
            </div>
        </div >
    )
}

export default Header;