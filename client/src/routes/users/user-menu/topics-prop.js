import { useUser } from "../../../usercontext";
import { userTopics } from "../../../api"
import { useState } from "react";
import './users.css'

function TopicProp({ topic }) {
    const { token } = useUser()

    const [follow, setFollow] = useState(!!topic.following);

    const handleChange = async () => {
        setFollow(!follow);
        await userTopics(token, topic.id, !follow);
    }
    const checkStyle = (follow ? 'checked' : 'unchecked')

    return (
        <label
            key={topic}
        >
            <div
                style={{ backgroundImage: 'url(' + topic.image + ')' }}
                className={'topic-choice ' + checkStyle}
            >
                <h4>{topic.name}</h4>
            </div>
            <input
                className='hide'
                type="checkbox"
                name="topicId"
                checked={follow}
                onChange={handleChange}
            />
        </label>
    )
}

export default TopicProp;