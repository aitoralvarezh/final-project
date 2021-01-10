import { Link } from 'react-router-dom'

function NewArticle() {

    return (
        <Link
            to="/articles/write"
            className="new-article-button"
        >        
            +
        </Link >
    )
}

export default NewArticle;