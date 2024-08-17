
export const getArticles = async () => {
    const api = process.env.REACT_APP_NEWS_API_KEY
    const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${api}`
    try {
        const res = await fetch(`${url}`)
        if (!res.ok) {
            throw new Error ('Failed to fetch your papers.')
        }
        const data = await res.json()
        console.log(data)
        return data.articles
    } catch(error) {
        console.error('Failed to fetch data because:', error.message)
        return []
    }
}
//https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${api}