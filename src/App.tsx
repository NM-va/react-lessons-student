import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css';
import './styles.css';

// Ленивая загрузка компонентов упражнений
const Home = lazy(() => import('./modules/Home'))
const Exercise1 = lazy(() => import('./exercises/Exercise1'))
const Exercise2 = lazy(() => import('./exercises/Exercise2'))
const Exercise3 = lazy(() => import('./exercises/Exercise3'))
// Добавьте больше упражнений по мере необходимости

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <div className="logo">React Advanced</div>
          <ul className="nav-links">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/exercise1">Упражнение 1: Хуки и События</Link></li>
            <li><Link to="/exercise2">Упражнение 2</Link></li>
            <li><Link to="/exercise3">Упражнение 3</Link></li>
          </ul>
        </nav>

        <main className="content">
          <Suspense fallback={<div className="loading">Загрузка...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exercise1" element={<Exercise1 />} />
              <Route path="/exercise2" element={<Exercise2 />} />
              <Route path="/exercise3" element={<Exercise3 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App