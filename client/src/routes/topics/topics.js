import { useTopics } from "../../api";
import { Link } from 'react-router-dom'

function Topics() {
    const topics = useTopics();

    if (!topics) return 'Loading...'

    return (
        <div className="topics">
            {topics.map(topic =>
                <Link
                    key={topic}
                    to={`/topics/${topic.name}`}
                >
                    
                    <div className="topic">
                        {topic.name}
                    </div>
                </Link>
            )}
        </div >
    )
}

export default Topics;