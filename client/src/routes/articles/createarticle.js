import { useState, useRef } from 'react';
import { useUser } from '../../usercontext';
import { createArticles, useTopics } from '../../api'
import { useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './readarticle.css'

function CreateArticles() {
    const history = useHistory();

    const { token } = useUser()
    const theInput = useRef();
    const topics = useTopics()

    const [preview, setPreview] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [topicId, setTopicId] = useState('');
    const [visible, setVisible] = useState('1');


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
                <div className="create-article-data" >
                    <div>
                        <div className=" main-data-input">
                            <div
                                className="article-create-img"
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
                            <div className="minor-choice-selection">
                                <select
                                    name="topicId"
                                    value={topicId}
                                    required
                                    onChange={e => setTopicId(e.target.value)}
                                >
                                    <option hidden
                                        value=""
                                    >
                                        selecciona
                                    </option>
                                    {topics.map(topic =>

                                        <option
                                            key={topic}
                                            value={topic.id}
                                        >
                                            {topic.name}
                                        </option>
                                    )}
                                </select>
                                <select
                                    name="visible"
                                    value={visible}
                                    onChange={e => setVisible(e.target.value)}>
                                    <option value="1" selected>Público</option>
                                    <option value="0">Privado</option>
                                </select>
                            </div>
                        </div>
                        <div className="data-input">

                            <label>
                                <div className="name ">Título</div>
                                <input
                                    name="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="create-article-content">
                        <ReactQuill
                            name="content"
                            defaultValue={content}
                            onChange={setContent}
                        />
                    </div>
                </div>
                <button className="save">Publicar</button>
            </form>
        </div >
    )
}

export default CreateArticles;
