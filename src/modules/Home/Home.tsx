import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Курс по React - Портал студента</h1>

            <div className="course-overview">
                <h2>Обзор курса</h2>
            </div>

            <div className="exercise-list">
                <h2>Упражнения</h2>
                <div className="exercise-cards">
                    <div className="exercise-card">
                        <h3>Упражнение 1: Продвинутые хуки и обработка событий</h3>
                        <p>Практика создания пользовательских хуков и реализации продвинутых паттернов обработки событий</p>
                        <Link to="/exercise1">Начать упражнение</Link>
                    </div>

                    <div className="exercise-card">
                        <h3>Упражнение 2: Углубленное изучение хуков в React</h3>
                        <p>Типичные ошибки, примеры использования, best practices</p>
                        <Link to="/exercise2">Начать упражнение</Link>
                    </div>

                    <div className="exercise-card">
                        <h3>Упражнение 3: Оптимизация производительности</h3>
                        <p>Выявление и устранение узких мест производительности в React-приложениях</p>
                        <Link to="/exercise3">Начать упражнение</Link>
                    </div>
                    <div className="exercise-card">
                        <h3>Упражнение 4: Слоты и useImperative</h3>
                        <Link to="/exercise4">Начать упражнение</Link>
                    </div>
                </div>
            </div>

            <div className="learning-resources">
                <h2>Учебные ресурсы</h2>
                <ul>
                    <li>Официальная документация React: <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">react.dev</a></li>
                    <li>Руководство по TypeScript: <a href="https://www.typescriptlang.org/docs/handbook/intro.html" target="_blank" rel="noopener noreferrer">typescriptlang.org</a></li>
                    <li>Документация React Router: <a href="https://reactrouter.com/en/main" target="_blank" rel="noopener noreferrer">reactrouter.com</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Home