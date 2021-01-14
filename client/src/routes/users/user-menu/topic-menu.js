import { userTopics, useTopics } from "../../../api"
import { useState } from 'react'
import { useUser } from "../../../usercontext";


function FollowTopics() {
    const topics = useTopics();
    const { user: me, token } = useUser()
    const [topicId, setTopicId] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        console.log('>>', topicId);
        const data = await userTopics( token, topicId );
        if (data) {
            return data
        }
    }

    if (!topics) return 'Loading...'
    return (
        <form onSubmit={handleSubmit}>
            {topics.map(topic =>
                <label
                    key={topic}
                >{topic.name}
                    {topic.id}
                    <input
                    autoFocus
                        type="checkbox"
                        name="topicId"
                        value={topic.id}
                        onChange={e => setTopicId(e.target.value)}
                    />
                    <button> seguir</button>
                </label>
            )}

        </form>
    )
}



export default FollowTopics;