import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { getArticles } from '../apicalls'

const Article = () => {
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchArticles = async () => {
            const fetchedArticles = await getArticles() 
            setArticles(fetchedArticles) 
        }

        fetchArticles()
    }, [] )

    const handleClick = (article) => {
        navigate(`/article/${article.title}`, { state: { article } })
    }

    return (
        <div className="article-list">
            {articles.map((article, index) => {
                <div key={index} className="article">
                    <h2>{article.title}</h2>
                    {article.urlToImage && <img src={article.urlToImage} alt={article.title}/>}
                    <p>{article.description}</p>
                    <p><small>{new Date(article.publishedAt).toLocaleDateString()}</small></p>
                </div>
            })}
        </div>
    )
}

export default Article 