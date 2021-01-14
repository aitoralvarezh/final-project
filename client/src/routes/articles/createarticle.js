import { useState, useRef } from 'react';
import { useUser } from '../../usercontext';
import { createArticles, useTopics } from '../../api'
import { useHistory } from 'react-router-dom';

function CreateArticles() {
    const history = useHistory();

    const { user: token } = useUser()
    const theInput = useRef();
    const topics = useTopics()

    const [preview, setPreview] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [topicId, setTopicId] = useState('');
    const [visible, setVisible] = useState('');


    const handleSubmit = async e => {
        e.preventDefault();
        const image = e.target.image.files[0];

        const data = await createArticles(token, topicId, image, title, content, visible);

        history.push('/articles/read/' + data[0].id);


        if (data) {
            return data
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
    const style = preview && { backgroundImage: 'url(' + preview + ')' }


    if (!topics) return 'loading...'

    return (
        <div>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div
                    className="avatar showAvatar"
                    style={style}
                    onClick={handleClick}
                    value={preview}

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
                        <div className="name">Título</div>
                        <input
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </label>
                    <label >
                        <div className="name">topic</div>
                        <select
                            name="topicId"
                            value={topicId}
                            onChange={e => setTopicId(e.target.value)}
                        >
                            {topics.map(topic =>
                                <option
                                    key={topic}
                                    value={topic.id}
                                >
                                    {topic.name}
                                </option>
                            )}
                        </select>
                    </label>
                    <label >
                        <div className="name">visible</div>
                        <select
                            name="visible"
                            value={visible}
                            onChange={e => setVisible(e.target.value)}>
                            <option value="1" selected>Público</option>
                            <option value="0">Privado</option>

                        </select>
                    </label>
                    <label>
                        <div className="name">Descripción</div>
                        <textarea
                            name="content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </label>
                </div>
                <button className="">Guardar</button>
            </form>
        </div >
    )
}

export default CreateArticles;
