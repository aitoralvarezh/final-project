import { Link } from 'react-router-dom';

function ArticleProp({ article, className }) {
    return (
        <div>
            <Link
                key={article}
                to={`/articles/read/${article.id}`}
            >
                <div className={'article-box ' + className}>
                    <div
                        className="article-img"
                        style={{ backgroundImage: 'url(' + article.image + ')' }}
                    >
                    </div>
                    <div className="article-title">
                        {article.title}
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default ArticleProp;