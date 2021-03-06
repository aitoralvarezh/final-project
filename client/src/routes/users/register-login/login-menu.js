import { Link } from 'react-router-dom';
import { useSetUser, useUser } from '../../../usercontext'
import Login from './login'

function Account() {
    const setMe = useSetUser();
    const me = useUser();
    let avatarStyle = me && me.user.image && { backgroundImage: 'url(' + me.user.image + ')' }

    if (!me) {
        return (
            <div>
                <Login />
            </div>
        )
    }

    return (
        <div className="tab user">

            <Link to="/users/me">
                {me &&
                    <div >
                        <div className='avatar' style={avatarStyle} />
                    </div>
                }
            </Link>
            <Link
                className="log-in-out"
                to="/"
                onClick={() => setMe()}
            >
                Desconectar
            </Link>
        </div>
    )
}

export default Account;