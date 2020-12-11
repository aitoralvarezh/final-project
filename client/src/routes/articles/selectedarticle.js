import { useParams } from 'react-router-dom'
import {  useSelectedArticle } from '../../api';
function SelectedArticle() {

    const {  id } = useParams();
   /*  const articles = useSelectedArticle(); */
    return (
        <div className="article">
            Estas en el artículo: {id}
{/*             {articles.content}
 */}            <div>

            </div>
        </div>
    )
}

export default SelectedArticle;