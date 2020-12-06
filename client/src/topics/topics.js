function Topics() {
    const topics = ['a', 'b', 'c']
    return (
        <div className="topics">
            {topics.map(topic =>
                <div className="topic">
                    {topic}
                </div>
            )}
        </div>
    )
}

export default Topics;