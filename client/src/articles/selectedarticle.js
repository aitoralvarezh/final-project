import { useParams } from 'react-router-dom'
function SelectedArticle() {

    const { id } = useParams();
    return (
        <div className="article">
            Estas en el artículo: {id}
            <div>

            </div>
        </div>
    )
}

export default SelectedArticle;