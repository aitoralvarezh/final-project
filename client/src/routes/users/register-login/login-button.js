import { useState } from 'react';
import { Link } from 'react-router-dom';
import './display.css'

function Acordeon({children}) {
    const [show, setShow] = useState(false)
    return (
        <div className="acordeon log-in-out">
            <Link onClick={() => setShow(!show)}>
                {show ? 'x' : 'Login'}
            </Link>

            {show &&
                <div className="display">
                    {children}
                </div>
            }
        </div>

    )
}

export default Acordeon;