import { Link } from 'react-router-dom';
import { useArticles } from '../../api';
import { useUser } from '../../usercontext';
import Carousel from '../../welcome/Carousel';
import NewArticleProp from './last-article-prop';

function LastArticles() {
    const lastArticles = useArticles(/* me ? 10 : 0 */);
    const me = useUser();

    if (!lastArticles) return 'Loading...'

    if (!me) {
        return (
            <div>
                {lastArticles.map(article =>
                    <NewArticleProp article={article} />
                )}
            </div>
        )
    }

    return (
        <div>
            <Carousel>
                {lastArticles.map(article =>
                    <NewArticleProp article={article} className={'banner-article'}/>
                )}
            </Carousel>
        </div>
    )
}

export default LastArticles;