import { Link } from 'react-router-dom';

function LastArticles() {
    const lastArticles = ['hoy', 'ayer', 'la semana pasada']
    return (
        <div>
            {lastArticles.map(article =>

                <Link to="/articles/new/:id"
                    key={article}
                >
                    <div className="article-box aside">
                        <div className="aside-article-img">
                            Imagen
                            </div>
                        <div className="aside-article-title">
                            {article}
                        </div>
                    </div>
                </Link>

            )}
        </div>
    )
}

export default LastArticles;