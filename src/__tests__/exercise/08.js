// testing custom hooks
// http://localhost:3000/counter-hook

import React from 'react'
import {render, screen, act} from '@testing-library/react'
import {renderHook, act as rendererAct} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// Example component
function Counter() {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={increment}>increase</button>
      <button onClick={decrement}>decrease</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<Counter />)

  const countElement = screen.getByText(/count/i)

  expect(countElement).toHaveTextContent(`count: 0`)

  userEvent.click(screen.getByRole('button', {name: /increase/i}))

  expect(countElement).toHaveTextContent(`count: 1`)

  userEvent.click(screen.getByRole('button', {name: /decrease/i}))

  expect(countElement).toHaveTextContent(`count: 0`)
})

// Fake component : extra credit 1
test('fake component > exposes the count and increament/decrement functions', () => {
  let results = {}
  function TestComponent() {
    Object.assign(results, useCounter())
    return null
  }
  render(<TestComponent />)

  expect(results.count).toBe(0)

  act(() => {
    results.increment()
  })

  expect(results.count).toBe(1)

  act(() => {
    results.decrement()
  })

  expect(results.count).toBe(0)
})

// Extra credit 2
function setup({initialCount = 0, step = 1}) {
  let results = {}
  function TestComponent() {
    Object.assign(results, useCounter({initialCount, step}))
    return null
  }
  render(<TestComponent />)

  return results
}

test('allows customization of the initial count', () => {
  const results = setup({initialCount: 8})

  expect(results.count).toBe(8)
})

test('allows customization of the step', () => {
  const results = setup({step: 2})

  expect(results.count).toBe(0)

  act(() => {
    results.increment()
  })

  expect(results.count).toBe(2)

  act(() => {
    results.decrement()
  })

  expect(results.count).toBe(0)
})

// Extra credit 3
test('allows customization', () => {
  const {result} = renderHook(() => useCounter({initialCount: 4, step: 3}))

  expect(result.current.count).toBe(4)

  rendererAct(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(7)

  rendererAct(() => {
    result.current.decrement()
  })

  expect(result.current.count).toBe(4)
})
