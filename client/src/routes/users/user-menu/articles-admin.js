import { useMyArticles, deleteArticle } from "../../../api";
import { Link } from 'react-router-dom'
import { useUser } from "../../../usercontext";
import { confirmAlert } from 'react-confirm-alert'; // Import
import Acordeon from "../register-login/login-button";



function MyArticles() {

    const articles = useMyArticles();
    const me = useUser();

    const submit = async (id) => {

        await deleteArticle(me.token, id)
        window.location.reload()
    }

    if (!articles) return 'Loading...'

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
                        <Acordeon>
                            <div className="dialog">
                                <h1>¿Quieres eliminar el artículo?</h1>
                                <div className="confirmation">
                                    <div className="confirm-button" onClick={() => submit(article.id)}>
                                        Borrar
                                    </div>
                                    <div className="confirm-button" >
                                        Cancelar
                                     </div>
                                </div>
                            </div>
                        </Acordeon>
                        <button>
                            {article.visible}
                        </button>
                    </div>
                </div>

            )}
        </div>
    )
}

export default MyArticles;