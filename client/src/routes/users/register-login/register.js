import { useState } from 'react';
import { useSetUser } from '../../../usercontext';
import { register } from '../../../api'

function Register() {
    const setMe = useSetUser();

    const [username, setusername] = useState();
    const [mail, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isError, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const data = await register(username, password, mail);
        if (data.token) {
            setMe(data)
        } else {
            setError(true)
        }
    }

    return (
        <div className="login-register">
            <form onSubmit={handleSubmit}>
                <label>
                    <div className="name">Nombre de usuario</div>
                    <input value={username} onChange={e => setusername(e.target.value)} />
                </label>
                <label>
                    <div className="name">Dirección de Email</div>
                    <input value={mail} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                <div className="name">Contraseña</div>

                    <input
                        type="password"
                        value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                {isError &&
                    <div className="error">
                        Error de login
                </div>
                }
                <button className="log-reg-button">Registro</button>
            </form>
        </div>
    )

}

export default Register;