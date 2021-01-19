import { useState, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';

function Acordeon({ children }, ref) {
    const [show, setShow] = useState(false)

    useImperativeHandle(ref, () => ({
        close: () => setShow(false)
        
    }))

    return (
        <div className="acordeon" >
            <Link onClick={() => setShow(!show)}>
                {show ? '' : 'Borrar'}
            </Link>

            { show &&
                <div className="display-box">
                    {children}
                </div>
            }
        </div >

    )
}

Acordeon = forwardRef(Acordeon);

export default Acordeon;