import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ArticleDetails = () => {
    const { state } = useLocation()
    const { article } = state || {}
    const [fullContent, setFullContent] = useState('')

    useEffect(() => {
        if (article && article.url) {
            const fetchContent = async () => {
                try {
                    const res = await axios.get(article.url)
                    const parser = new DOMParser()
                    const doc = parser.parseFromString(res.data, 'text/html')
                    const articleContent = doc.querySelector('article')?.textContent || 'No content found.'
                    console.log('article', articleContent)
                    setFullContent(articleContent)
                } catch (error) {
                    console.error('Could not fetch your content:', error)
                }
            }
            fetchContent()
        }
    }, [article.url])


    if (!article) {
        return <p> No article data found. </p>
    }
    return (
        <div className="article-details">
            <h2>{article.title}</h2>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            <p><strong>Source:</strong>{article.source?.name}</p>
            <p><strong>Date:</strong>{new Date(article.publishedAt).toLocaleDateString()}</p>
            {fullContent ? (
                <p>{fullContent}</p>
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