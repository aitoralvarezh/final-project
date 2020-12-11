import { useState } from 'react';
import { useUser, useSetUser } from '../../../usercontext';
import { userData } from '../../../api'

function EditProfile() {

    const { user: me, token } = useUser()
    const setMe = useSetUser()
  
    /*     console.log('editprofile: ', user);*/
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

    console.log('editprofile: ', me);


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="image"
                    className="avatar" style={{ backgroundImage: 'url(' + me.image + ')' }}
                    type='file'
                    accept="image/*"

                />

                <label>Nombre
                    <input
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label> Descripción
                    <input
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <button>Guardar</button>
            </form>
        </div>
    )
}

export default EditProfile;
