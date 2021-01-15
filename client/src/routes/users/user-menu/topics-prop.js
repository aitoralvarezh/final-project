import { useUser } from "../../../usercontext";
import { userTopics } from "../../../api"
import { useState } from "react";

function TopicProp({ topic }) {
    const { token } = useUser()

    const [follow, setFollow] = useState(!!topic.following);

    const handleChange = async () => {
        setFollow(!follow);
         await userTopics(token, topic.id, !follow);
    }

    return (
        <label
            key={topic}
        >{topic.name}
            <input
                type="checkbox"
                name="topicId"
                checked={follow}
                onChange={handleChange}
            />
        </label>
    )
}

export default TopicProp;