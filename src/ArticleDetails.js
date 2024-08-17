import { useLocation } from 'react-router-dom'

const ArticleDetails = () => {
    const { state } = useLocation()
    const { article } = state || {}

    console.log('Article Details:', article)

    if (!article) {
        return <p> No article data found. </p>
    }
    return (
        <div className="article-details">
            <h2>{article.title}</h2>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            <p><strong>Source:</strong>{article.source?.name}</p>
            <p><strong>Date:</strong>{new Date(article.publishedAt).toLocaleDateString()}</p>
            {article.content ? (
                <p>{article.content}</p>
            ) : (
                <p>
                    The full content of this article is not available.
                    You can read the full article <a href={article.url} target="_blank" rel="noopener noreferrer">here</a>.
                </p>
            )}
        </div>
    )
}

export default ArticleDetails 