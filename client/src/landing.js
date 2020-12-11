import ReadArticle from './routes/articles/readarticle';
import LastArticle from './routes/articles/lastarticle';
import Presentation from './presentation'
import './main.css'

function MainPage({ articles }) { 
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