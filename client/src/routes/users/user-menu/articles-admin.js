import { useMyArticles, deleteArticle } from "../../../api";
import { Link } from 'react-router-dom'
import { useState } from "react";


function MyArticles() {
    const [erase, setErase] = useState();

    const articles = useMyArticles();

    const handleClick = e => {
        e.preventDefault();
    }

    if (!articles) return 'Loading...'

    return (
        <div className={'read-article '}>
            {articles.map(article =>
                <div>
                    <Link
                        key={article}
                        to={`/articles/read/${article.id}`}
                    >
                        <div className="article-box">
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
                    <button
                        onClick={handleClick}
                    >
                        delete
                    </button>
                </div>

            )}
        </div>
    )
}

export default MyArticles;