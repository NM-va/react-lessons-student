import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Продвинутый курс по React - Портал студента</h1>

            <div className="course-overview">
                <h2>Обзор курса</h2>
                <p>
                    Добро пожаловать на продвинутый курс по React! Этот курс разработан для того, чтобы вывести ваши базовые
                    знания React на следующий уровень с помощью практических упражнений и подробных объяснений
                    внутренних механизмов работы React.
                </p>
                <p>
                    Каждое упражнение основывается на концепциях из лекций и предоставляет возможности для
                    практики живого кодирования. Основное внимание уделяется пониманию того, как React работает
                    "под капотом", и применению этих знаний в реальных сценариях.
                </p>
            </div>

            <div className="exercise-list">
                <h2>Расписание упражнений</h2>
                <div className="exercise-cards">
                    <div className="exercise-card">
                        <h3>Упражнение 1: Продвинутые хуки и обработка событий</h3>
                        <p>Практика создания пользовательских хуков и реализации продвинутых паттернов обработки событий</p>
                        <Link to="/exercise1">Начать упражнение</Link>
                    </div>

                    <div className="exercise-card">
                        <h3>Упражнение 2: Композиция компонентов и паттерны</h3>
                        <p>Применение продвинутых паттернов проектирования компонентов для решения сложных UI-задач</p>
                        <Link to="/exercise2">Начать упражнение</Link>
                    </div>

                    <div className="exercise-card">
                        <h3>Упражнение 3: Оптимизация производительности</h3>
                        <p>Выявление и устранение узких мест производительности в React-приложениях</p>
                        <Link to="/exercise3">Начать упражнение</Link>
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