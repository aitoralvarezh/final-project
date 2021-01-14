import { useState } from 'react';
import { Link } from 'react-router-dom';

function Acordeon({children}) {
    const [show, setShow] = useState(false)
    return (
        <div className="acordeon">
            <Link onClick={() => setShow(!show)}>
                {show ? 'X' : 'Borrar'}
            </Link>

            {show &&
                <div className="display-box">
                    {children}
                </div>
            }
        </div>

    )
}

export default Acordeon;