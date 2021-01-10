import { Link } from 'react-router-dom';
import { useSelectedTopicArticles } from '../../api';
import ArticleProp from './article-prop';
import './readarticle.css'

function ReadArticle({ article, className }) {

    const articles = useSelectedTopicArticles();

    if (!articles) return 'Loading...'

    return (
        <div className={'read-article ' + className}>
            {articles.map(article =>
                <ArticleProp article={article} />
            )}
        </div>
    )
}

export default ReadArticle;