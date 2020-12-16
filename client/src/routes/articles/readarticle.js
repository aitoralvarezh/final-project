import { Link } from 'react-router-dom';
import { useSelectedTopicArticles } from '../../api';
import './readarticle.css'

function ReadArticle() {

    const articles = useSelectedTopicArticles();
    if (!articles) return 'Loading...'

    return (
        <div>
            {articles.map(article =>
                <Link
                key={article}
                to={`/articles/${article.id}`}
                >
                    <div className="article-box">
                        <div className="article-img">
                            {article.user_id}
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