import { useParams } from 'react-router-dom';
import { useTopicArticles } from '../../api';
import ArticleProp from './article-prop';
import './readarticle.css'

function TopicArticle({ className }) {

    const { id } = useParams();
    const articles = useTopicArticles(id);

    if (!articles) return 'Loading...';
    return (
        <div className={'read-article ' + className}>
            {articles.map(article =>
                <ArticleProp article={article} />
            )}
        </div>
    )
}

export default TopicArticle;