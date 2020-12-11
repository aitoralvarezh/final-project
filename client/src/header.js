import './header.css'
import { Link } from 'react-router-dom'
import { useUser } from './usercontext';
import LoginButton from './routes/users/user-menu/login-menu';
import { useState } from 'react';

function Header() {
   

    return (
        <div className="header">
            <div className="tab">
                <Link to="/topics">Temas</Link>
            </div>
            <div className="tab">
                <Link to="/">Home</Link>
            </div>
            <Link to="/users/me">
              <LoginButton />
            </Link>

        </div>
    )
}

export default Header;