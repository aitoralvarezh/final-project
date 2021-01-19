import { useMyArticles, deleteArticle } from "../../../api";
import { Link } from 'react-router-dom'
import { useUser } from "../../../usercontext";
import Acordeon from "../register-login/acordeon";
import { useRef } from "react";
import VisibilityButton from "./visibility";



function MyArticles({ reload }) {
    const acordeon = useRef()

    const articles = useMyArticles();
    const { token } = useUser()


    const submit = async (id) => {

        await deleteArticle(token, id)
        reload()
    }

    if (!articles) return 'Loading...'
    
    if (!articles.length) return (
        <div
            className="complete-data"
        >
            <div>
                <h3>Aún no has escrito ningun artículo</h3>
                <Link
                    to="/articles/write"
                >
                    ¡Anímate a expresar lo que piensas!
            </Link>
            </div>
        </div>
    )
    return (
        <div className={'read-article '}>
            {articles.map(article =>
                <div className='article-menu'>
                    <Link
                        key={article}
                        to={`/articles/read/${article.id}`}
                    >
                        <div className="article-box">
                            <div
                                className="article-img"
                                style={{ backgroundImage: 'url(' + article.image + ')' }}
                            >
                            </div>
                            <div className="article-title">
                                {article.title}
                            </div>
                        </div>
                    </Link>
                    <div className='action-buttons'>
                        <Acordeon ref={acordeon}>
                            <div className="dialog">
                                <h1>¿Quieres eliminar el artículo?</h1>
                                <div className="confirmation">
                                    <div className="confirm-button" onClick={() => submit(article.id)}>
                                        Borrar
                                    </div>
                                    <div className="confirm-button"
                                        onClick={() => acordeon.current.close()}>
                                        Cancelar
                                     </div>
                                </div>
                            </div>
                        </Acordeon>
                        <div>
                            <VisibilityButton article={article} />
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default MyArticles;