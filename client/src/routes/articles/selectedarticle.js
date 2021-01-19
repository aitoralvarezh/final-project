import { useParams } from 'react-router-dom'
import { useSelectedArticle } from '../../api';
function SelectedArticle({ className }) {

    const { id } = useParams();

    const articles = useSelectedArticle(id);


    if (!articles) return 'Loading...'
    return (
        <div className={'selected-article ' + className}>
            {articles.map(article =>
                <div
                    key={article}
                >
                    <header className='article-data'>
                        <h1 className="title">
                            {article.title}
                        </h1>
                        <div className='article-user-data'>
                            <div
                                className='article-user-image'
                                style={{ backgroundImage: 'url(' + article.userimage + ')' }}
                            >
                            </div>
                            <div>{article.name}</div>
                        </div>
                        <div
                            className='article-header-image'
                            style={{ backgroundImage: 'url(' + article.image + ')' }}
                        >
                        </div>
                    </header>
                    <div className='article-content'
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>
            )}
        </div>
    )
}

export default SelectedArticle;