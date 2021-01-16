import { Link } from 'react-router-dom';
import { useSelectedTopicArticles } from '../../api';
import ArticleProp from './article-prop';
import './readarticle.css'

function ReadArticle({  className }) {

    const articles = useSelectedTopicArticles();

    if (!articles) return 'Loading...';

    if (!articles.length) return (
        <div
            className="complete-data"
        >
            <div>
                <h3>¿aun no has seguido ningun tema?</h3>
                <Link
                    to="/users/me"
                >
                    Completa tu perfil
            </Link>
            </div>
        </div>
    )

    return (
        <div className={'read-article ' + className}>
            {articles.map(article =>
                <ArticleProp article={article} />
            )}
        </div>
    )
}

export default ReadArticle;