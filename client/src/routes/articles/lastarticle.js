import { Link } from 'react-router-dom';
import { useArticles } from '../../api';

function LastArticles() {
    const lastArticles = useArticles();

    if (!lastArticles) return 'Loading...'

    return (
        <div>
            {lastArticles.map(article =>

                <Link
                    key={article}
                    to="/articles/new/:id"
                >
                    <div className="article-box">
                        <div className="article-img">
                            Imagen
                            </div>
                        <div className="article-title">
                            {article.date}
                            {article.title}
                        </div>
                    </div>
                </Link>

            )}
        </div>
    )
}

export default LastArticles;