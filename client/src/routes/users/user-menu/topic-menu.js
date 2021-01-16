import { useTopics } from "../../../api"
import TopicProp from "./topics-prop";


function FollowTopics() {
    const topics = useTopics();

    if (!topics) return 'Loading...';

    return (
        <div
            className="topic-choice-org"
        >
            {topics.map(topic =>
                <TopicProp topic={topic} />
            )}
        </div>
    )
}

export default FollowTopics;