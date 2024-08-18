import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'

const ArticleDetails = () => {
    const { state } = useLocation()
    const { article } = state || {}
    const [fullContent, setFullContent] = useState('')

    useEffect(() => {
        if (article && article.url) {
            const fetchContent = async () => {
                try {
                    const res = await axios.get(article.url)
                    const dom = new JSDOM(res.data, { url: article.url })
                    const parsedArticle = new Readability(dom.window.document).parse()
                    setFullContent(parsedArticle.textContent)
                } catch (error) {
                    console.error('Could not fetch your content:', error)
                }
            }
            fetchContent()
        }
    }, [article])


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