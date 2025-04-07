import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// Расширяем метод expect Vitest методами из react-testing-library
expect.extend(matchers)

// Выполняем очистку после каждого теста
afterEach(() => {
    cleanup()
})