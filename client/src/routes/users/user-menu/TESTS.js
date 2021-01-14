import { useState, useRef } from "react"
import Acordeon from "../register-login/login-button";
import './users.css'


function ConfirmBox() {

    const [show, setShow] = useState(false);


    const handleClick = e => {
        setShow(!show)
    }
    return (


       <Acordeon>
           <div>
               <h1>¿Quieres eliminar el artículo?</h1>
               <div className="confirmation">
                   <div >
                        Borrar
                   </div>
                   <div onClick={handleClick}>
                        Cancelar
                   </div>
               </div>
           </div>
       </Acordeon>


    )

};

export default ConfirmBox