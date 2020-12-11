import { Link } from 'react-router-dom';
import { useUser } from '../../../usercontext'

function LoginButton() {

    const me = useUser();
    let avatarStyle = me && me.user.image && { backgroundImage: 'url(' + me.user.image + ')' }

    return (
        <Link to="/users/me">
            {me &&
                <div className="tab user">
                    <div className='avatar' style={avatarStyle} />
                </div>
            }
        </Link>
    )
}

export default LoginButton;