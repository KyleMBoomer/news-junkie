import {useLocation} from 'react-router-dom' 

const ArticleDetails = () => {
    const { state } = useLocation()
    const { article } = state 

    return (
        <div className="article-details">
            <h1>{article.title}</h1>
            {article.toUrlImage && <img src={article.toUrlImage} alt={article.title}/>}
            <p><strong>Source:</strong>{article.source.name}</p>
            <p><strong>Date:</strong>{new Date(article.publishedAt).toLocaleDateString()}</p>
            <p>{article.content}</p>
        </div>
    )
}

export default ArticleDetails 