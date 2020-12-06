import ReadArticle from './articles/readarticle'

function MainPage({articles}) {
    return(
        <div className="main-page">
                Página principal.
                <ReadArticle articles={articles}/>
        </div>
    )
}

export default MainPage;