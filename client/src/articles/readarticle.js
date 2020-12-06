import { Link } from 'react-router-dom'

function ReadArticle() {
    
    const articles = ['lala', 'lele', 'lolo', 'lulu']

    return (
        <div>

            {articles.map(article =>
                <div
                    key={article}
                >
                    <Link to={`/articles/${article}`}>{article}</Link>
                </div>
            )}

        </div>
    )
}

export default ReadArticle;