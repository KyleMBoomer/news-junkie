import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Article from './Article'
import ArticleDetails from './ArticleDetails'
import './App.css';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Article />}/>
      <Route path="/article/:title" element={<ArticleDetails/>} />
    </Routes>
   </Router>
  );
}

export default App;
