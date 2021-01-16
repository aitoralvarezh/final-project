import { useState } from 'react';
import EditProfile from "./user-menu/users";
import Selector from './user-menu/option-selector';
import MyArticles from './user-menu/articles-admin';
import FollowTopics from './user-menu/topic-menu';
import './options.css'


function Options() {
    const [tab, setTab] = useState('Perfil')
    const [key, setKey] = useState(1);

    return (

        <div className='menu'>
            <aside className='select'>
                <Selector tab={tab} setTab={setTab} />
            </aside>
            <div className='selection'>
                {tab === 'Perfil' &&
                    <EditProfile />
                }
                {tab === 'Temas' &&

                    <FollowTopics />
                }
                {tab === 'Artículos' &&
                    <MyArticles
                        key={key}
                        reload={() => setKey(key + 1)} />
                }

            </div>
        </div>
    )
}

export default Options;