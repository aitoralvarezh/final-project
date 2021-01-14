import { Link } from 'react-router-dom';
import { useSelectedTopicArticles } from '../../api';
import ArticleProp from './article-prop';
import './readarticle.css'

function ReadArticle({ article, className }) {

    const articles = useSelectedTopicArticles();

    if (!articles) return 'Loading...' /* (
        <div>
            <h3>¿aun no has seguido un tema?</h3>
            <Link
            to="/users/me"
            >
                Completa tu perfil
            </Link>
        </div>
    ) */

    return (
        <div className={'read-article ' + className}>
            {articles.map(article =>
                <ArticleProp article={article} />
            )}
        </div>
    )
}

export default ReadArticle;