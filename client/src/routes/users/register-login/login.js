import { useState } from 'react';
import { useSetUser } from '../../../usercontext';
import { login } from '../../../api'
import './display.css'

function Login() {
    const setMe = useSetUser();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isError, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await login(username, password);
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
        <div className="login-register">
            <form onSubmit={handleSubmit}>
                <label>
                    <div className="name">Nombre de usuario</div>
                    <input
                        autoFocus
                        placeholder="Usuario..."
                        value={username}
                        onChange={e => setUsername(e.target.value)}
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
                <button className="log-reg-button">Inicia sesión</button>
            </form>
        </div>
    )

}

export default Login;