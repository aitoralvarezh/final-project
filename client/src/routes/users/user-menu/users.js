import { useState, useRef } from 'react';
import { useUser, useSetUser } from '../../../usercontext';
import { userData } from '../../../api'
import './users.css'

function EditProfile() {

    const { user: me, token } = useUser()
    const setMe = useSetUser()
    const theInput = useRef();

    const [name, setName] = useState(me.name || '')
    const [description, setDescription] = useState(me.description || '')

    const handleSubmit = async e => {
        e.preventDefault();
        const image = e.target.image.files[0];

        const data = await userData(token, image, name, description);
        console.log('Moreprofileshit: ', data);
        if (data) {
            return setMe({ token, user: data })
        }
    }
    const handlePick = e => {
        theInput.current.click()
    }

    console.log('editprofile: ', me);


    return (
        <div>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div
                    className="avatar showAvatar"
                    style={{ backgroundImage: 'url(' + me.image + ')' }}
                    onClick={handlePick}
                >

                </div>
                <input
                    className="hide"
                    name="image"
                    type='file'
                    accept="image/*"
                    ref={theInput}

                />
                <div className="data-input">

                    <label >
                        <div className="name">Nombre</div>
                        <input
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className="name">Descripción</div>
                        <input
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <button className="save">Guardar</button>
            </form>
        </div>
    )
}

export default EditProfile;
