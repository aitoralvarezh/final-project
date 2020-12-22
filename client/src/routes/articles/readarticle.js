import { Link } from 'react-router-dom';
import { useSelectedTopicArticles } from '../../api';
import './readarticle.css'

function ReadArticle({ className }) {

    const articles = useSelectedTopicArticles();

    if (!articles) return 'Loading...'

    return (
        <div className={'read-article ' + className}>
            {articles.map(article =>
                <Link
                    key={article}
                    to={`/articles/read/${article.id}`}
                >
                    <div className="article-box">
                        <div
                            className="article-img"
                            style={{ backgroundImage: 'url(' + article.image + ')' }}
                        >
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