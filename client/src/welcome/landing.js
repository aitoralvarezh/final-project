import ReadArticle from '../routes/articles/readarticle';
import LastArticles from '../routes/articles/lastarticle';
import Banner from './banner'
import { useUser } from '../usercontext';
import './main.css'


import { Route } from 'react-router-dom';
import SelectedArticle from '../routes/articles/selectedarticle'

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
                </div>
            </div>
        </div>
    )
}

export default MainPage;