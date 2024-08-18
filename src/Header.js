import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="app-header">
            <Link to="/" className="header-link">
            <h1>📰 News Junkie 📰</h1>
            </Link>
        </header>
    )
}

export default Header