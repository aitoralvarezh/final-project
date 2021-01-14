import { useArticles } from '../../api';
import { useUser } from '../../usercontext';
import Carousel from '../../welcome/Carousel';
import ArticleProp from './article-prop';

function LastArticles() {
    const lastArticles = useArticles(/* me ? 10 : 0 */);
    const me = useUser();

    if (!lastArticles) return 'Loading...'

    if (!me) {
        return (
            <div>
                {lastArticles.map(article =>
                    <ArticleProp article={article} />
                )}
            </div>
        )
    }

    return (
        <div>
            <Carousel>
                {lastArticles.map(article =>
                    <ArticleProp article={article} className={'banner-article'}/>
                )}
            </Carousel>
        </div>
    )
}

export default LastArticles;