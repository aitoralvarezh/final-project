import './banner.css'
import Register from '../routes/users/register-login/register'
import Acordeon from '../routes/users/register-login/login-button'
import { useUser } from '../usercontext';
import Account from '../routes/users/register-login/login-menu';
import LastArticles from '../routes/articles/lastarticle'
import { useState } from 'react';

function Banner({ children }) {
    const me = useUser();

    const [isRegister, setRegister] = useState(false)

    if (!me) {
        return (
            <div className="banner">
                <div className="intro-message">
                    hello
                </div>
                <div>
                    
                        <div>
                            {isRegister ? <Register /> : <Account />}
                            <div onClick={() => setRegister(!isRegister)} className="toggle">
                                {isRegister ? 'Ya tienes cuenta? Logeate' : 'No tienes cuenta? Registrate'}
                            </div>
                        </div>
                    
                </div>
            </div>
        )
    }



    return (
        <div className="banner">
            <LastArticles />
        </div>
    )
}


export default Banner;