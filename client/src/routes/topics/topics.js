import { useTopics } from "../../api";
import { Link } from 'react-router-dom'
import './topics.css'

function Topics() {
    const topics = useTopics();

    if (!topics) return 'Loading...'


    return (
        <div className="topics">
            {topics.map(topic =>
                <Link
                    key={topic}
                    to={`/topics/read/${topic.id}`}
                >
                    <div
                        style={{ backgroundImage: 'url(' + topic.image + ')' }}
                        className="topic">
                        <h3>{topic.name}</h3>
                    </div>
                </Link>
            )}
        </div >
    )
}

export default Topics;