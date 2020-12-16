import { useState } from 'react';
import { useSetUser, useUser } from '../../../usercontext';
import { login } from '../../../api'
import './display.css'

function Login() {
    const me = useUser()
    const setMe = useSetUser();
    const [username, setusername] = useState();
    const [mail, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isError, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await login(username, password, mail);
        if (data.token) {
            setMe(data)

        } else {
            setError(true)
        }
    }

    if (!setMe) {
        return 'loading...'
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <label>
                    <div className="name">Nombre de usuario</div>
                    <input
                        autoFocus
                        placeholder="Usuario..."
                        value={username}
                        onChange={e => setusername(e.target.value)}
                    />
                </label>
                <label>
                    <div className="name">Contraseña</div>
                    <input
                        type="password"
                        placeholder="Contraseña..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                {isError &&
                    <div className="error">
                        Error de login
                </div>
                }
                <button className="log-in-out">Inicia sesión</button>
            </form>
        </div>
    )

}

export default Login;