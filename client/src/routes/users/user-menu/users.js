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
    const [preview, setPreview] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const image = e.target.image.files[0];

        const data = await userData(token, image, name, description);
        console.log('Moreprofileshit: ', data);
        if (data) {
            return setMe({ token, user: data })
        }
    }
    const handleClick = e => {
        theInput.current.click()
    }
    const handlePick = e => {
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result)
        reader.readAsDataURL(e.target.files[0])
    }

    console.log('editprofile: ', me);

    const style = preview && { backgroundImage: 'url(' + preview + ')' }


    return (
        <div>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div
                    
                    className="avatar showAvatar"
                    onClick={handleClick}
                    style={style}
                >
                </div>
                <input
                    className="hide"
                    name="image"
                    type='file'
                    accept="image/*"
                    ref={theInput}
                    onChange={handlePick}

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
