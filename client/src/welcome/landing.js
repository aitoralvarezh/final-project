import { useUser } from '../usercontext';
import ReadArticle from '../routes/articles/readarticle';
import LastArticles from '../routes/articles/lastarticle';
import NewArticle from '../routes/articles/createbutton';
import Banner from './banner'
import './main.css'


import { Route } from 'react-router-dom';
import SelectedArticle from '../routes/articles/selectedarticle'
import CreateArticles from '../routes/articles/createarticle';

function MainPage({ articles }) {
    const me = useUser();
    if (!me) {
        return (

            <div className="selected-articles">
                <Banner />
                <LastArticles />
            </div>

        )
    }

    return (
        <div>
            <div >
                <Banner>
                    <LastArticles />
                </Banner>
            </div>
            <div className="main-page">
                <div className="new-articles">
                    <ReadArticle />
                    <NewArticle />
                </div>
            </div>
        </div>
    )
}

export default MainPage;