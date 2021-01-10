import { useState } from 'react';
import EditProfile from "./user-menu/users";
import Selector from './user-menu/option-selector';
import './options.css'
import Topics from '../topics/topics';
import ReadArticle from '../articles/readarticle';
import MyArticles from './user-menu/articles-admin';


function Options() {
    const [tab, setTab] = useState('profile')

    return (

        <div className='menu'>
            <div className='select'>
                <Selector tab={tab} setTab={setTab} />
            </div>
            <div className='selection'>
                {tab === 'profile' &&
                    <EditProfile />
                }
                {tab === 'topics' &&
                    <Topics />
                }
                {tab === 'articles' &&
                    <MyArticles />
                }
            </div>
        </div>
    )
}

export default Options;