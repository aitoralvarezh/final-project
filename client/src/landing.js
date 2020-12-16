import ReadArticle from './routes/articles/readarticle';
import LastArticle from './routes/articles/lastarticle';
import Presentation from './presentation'
import './main.css'
import { useUser } from './usercontext';

function MainPage({ articles }) {
    const me = useUser();
    if (!me) return (

        <div className="selected-articles">
            <LastArticle />
        </div>

    )

    return (
        <div>
            <div className="main-page">
                <div className="selected-articles">
                    <ReadArticle articles={articles} />
                </div>
                <div className="new-articles">
                    <LastArticle />
                </div>
            </div>
        </div>
    )
}

export default MainPage;