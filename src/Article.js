import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArticles } from './apicalls'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import '@glidejs/glide/dist/css/glide.theme.min.css'
import './Article.css'

const Article = () => {
    const [articles, setArticles] = useState([])
    const [sort, setSort] = useState('newest')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchArticles = async () => {
            const fetchedArticles = await getArticles()
            setArticles(fetchedArticles)
        }

        fetchArticles()
    }, [sort])

    const sortArticles = (articles, option) => {
        const sortedArticles = [...articles].sort((a, b) => {
            const dateA = new Date(a.publishedAt)
            const dateB = new Date(b.publishedAt)
            return option === 'newest' ? dateB - dateA : dateA - dateB
        })
        setArticles(sortedArticles)
    }

    useEffect(() => {
        if (articles.length) {
            new Glide('.glide', {
                type: 'carousel',
                startAt: 0,
                perView: 1,
                gap: 20,
                focusAt: 'center',
                autoplay: 5000,
            }).mount()
        }
    }, [articles])

    const handleClick = (article) => {
        navigate(`/article/${article.title}`, { state: { article } })
    }

    const handleSort = (event) => {
        setSort(event.target.value)
    }

    return (
        <div>
            <div className="sort-form">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sort} onChange={handleSort}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
            <div className="glide">
                <h2 className="glide-header">Today's Stories:</h2>
                <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">‹</button>
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">›</button>
                </div>
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {articles.map((article, index) => (
                            <li key={index} className="glide__slide" onClick={() => handleClick(article)}>
                                <h2>{article.title}</h2>
                                {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                                <p>{article.description}</p>
                                <p><small>{new Date(article.publishedAt).toLocaleDateString()}</small></p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Article 