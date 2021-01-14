import { useState } from 'react';
import EditProfile from "./user-menu/users";
import Selector from './user-menu/option-selector';
import './options.css'
import MyArticles from './user-menu/articles-admin';
import FollowTopics from './user-menu/topic-menu';


function Options() {
    const [tab, setTab] = useState('articles')

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
                    <FollowTopics />
                }
                {tab === 'articles' &&
                    <MyArticles />
                }
            </div>
        </div>
    )
}

export default Options;