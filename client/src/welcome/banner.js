import './banner.css'
import Register from '../routes/users/register-login/register'
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
                    <h3>Buenas, te doy la bienvenida a <strong>Illuminare</strong></h3>
                     <p>un portal donde leer y compartir tus opiniones y la de muchos usuarios
                    sobre una diversa variedad de temas.</p>
                </div>
                <div>

                    <div className="register-box">
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