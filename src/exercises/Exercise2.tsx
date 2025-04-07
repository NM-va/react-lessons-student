import React from 'react'

const Exercise2: React.FC = () => {
    return (
        <div className="exercise-container">
            <h1>Упражнение 2: Композиция компонентов & Паттерны</h1>

            <div className="coming-soon">
                <p>Материалы для этого упражнения готовятся и будут доступны после прохождения соответствующей лекции.</p>
                <p>Практические задания будут включать:</p>
                <ul>
                    <li>Реализация паттерна составного компонента (Compound Component)</li>
                    <li>Создание компонентов высшего порядка (HOC)</li>
                    <li>Применение паттерна рендер-пропс</li>
                    <li>Проектирование гибких и расширяемых API компонентов</li>
                </ul>
            </div>
        </div>
    )
}

export default Exercise2