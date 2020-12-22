import { useState, useRef } from 'react';
import { useUser, useSetUser } from '../../usercontext';
import { createArticles } from '../../api'
import { useHistory } from 'react-router-dom';

function CreateArticles() {
    const history = useHistory();

    const { user: me, token } = useUser()
    const setMe = useSetUser()
    const theInput = useRef();

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        const image = e.target.image.files[0];

        const data = await createArticles(token, image, title, content);
         history.push('/articles/' + data.id);
        return data
    }
    const handlePick = e => {
        theInput.current.click()
    }

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
                        <div className="name">Título</div>
                        <input
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className="name">Descripción</div>
                        <input
                            name="content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </label>
                </div>
                <button className="save">Guardar</button>
            </form>
        </div>
    )
}

export default CreateArticles;
