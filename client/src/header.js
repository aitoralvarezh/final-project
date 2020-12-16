import './header.css'
import { Link } from 'react-router-dom'
import { useSetUser } from './usercontext';
import Account from './routes/users/register-login/login-menu';

function Header() {

    const setMe = useSetUser()
    return (
        <div className="header">
            <div className="tab">
                <Link to="/topics">Temas</Link>
            </div>
            <div className="tab">
                <Link to="/">Home</Link>
            </div>
            <div>
                <Account />                
            </div>


        </div >
    )
}

export default Header;