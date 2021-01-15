import { useState } from "react"

function ConfirmBox() {

    const [show, setShow] = useState()
    
    return (
        <button onClick={() => setShow(!show)}>
            {show ? 'publico' : 'privado'}
        </button>
    )

};

export default ConfirmBox