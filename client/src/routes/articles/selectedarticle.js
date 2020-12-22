import { useParams } from 'react-router-dom'
import { useSelectedArticle } from '../../api';
function SelectedArticle({ className }) {

    const { id } = useParams();

    const articles = useSelectedArticle(id);


    if (!articles) return 'Loading...'
    return (
        <div className="article">

            <div className={'read-article ' + className}>
                Estas en el artículo: {id}
                {articles.map(article =>
                    <div
                        key={article}
                    >
                        <div className="la">
                            <header>
                                <div className="">
                                    {article.title}
                                </div>
                                <div
                                    className='article-header-image'
                                    style={{ backgroundImage: 'url(' + article.image + ')' }}
                                >
                                    {article.image}
                                </div>
                                <div
                                    className='user-image'
                                    style={{ backgroundImage: 'url(' + article.userimage + ')' }}
                                >
                                    {article.userimage}
                                </div>
                            </header>
                            <div >
                                {article.content}
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}

export default SelectedArticle;