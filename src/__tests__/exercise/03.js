// Avoid implementation details
// http://localhost:3000/counter

import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)
  const decrement = screen.getByRole('button', {name: 'Decrement'})
  const increment = screen.getByRole('button', {name: 'Increment'})
  const message = container.firstChild.querySelector('div')

  expect(message).toHaveTextContent('Current count: 0')
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  user.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
