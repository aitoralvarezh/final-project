import { useParams } from 'react-router-dom';
import { useTopicArticles } from '../../api';
import ArticleProp from './article-prop';
import './readarticle.css'

function TopicArticle({ className }) {

    const { id } = useParams();
    const articles = useTopicArticles(id);

    if (!articles) return 'Loading...';
    return (
        <div>
            <div>
                hola
            </div>
        <div className={'read-article ' + className}>
            {articles.map(article =>
            <div>
                <ArticleProp article={article} />
                {}
</div>
                )}
        </div>
                </div>
    )
}

export default TopicArticle;