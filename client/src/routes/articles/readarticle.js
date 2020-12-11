import { Link } from 'react-router-dom';
import { useArticles } from '../../api';
import './readarticle.css'

function ReadArticle() {

    const articles = useArticles();
    if (!articles) return 'Loading...'

    return (
        <div>
            {articles.map(article =>
                <Link
                key={article}
                to={`/articles/${article.id}`}
                >
                    <div className="article-box">
                        <div className="main-article-img">
                            {article.content}
                        </div>
                        <div className="article-title">
                            {article.title}
                        </div>
                    </div>
                </Link>

            )}
        </div>
    )
}

export default ReadArticle;