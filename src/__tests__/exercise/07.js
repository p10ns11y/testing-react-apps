// testing with context and a custom render method
// http://localhost:3000/easy-button

import React from 'react'
import {render, screen} from '@testing-library/react'
import {render as importedCustomRender} from 'test/test-utils'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

test('renders with the light styles for the light theme', () => {
  function Wrapper({children}) {
    return <ThemeProvider>{children}</ThemeProvider>
  }
  render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})

  const button = screen.getByRole('button', {name: /easy/i})

  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

// Extra credit 1
test('renders with the dark styles for the dark theme', () => {
  function Wrapper({children}) {
    return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  }
  render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})

  const button = screen.getByRole('button', {name: /easy/i})

  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

// Extra credit 2
function customRender(ui, theme, options) {
  function Wrapper({children}) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }
  return render(ui, {wrapper: Wrapper, ...options})
}

test('custom rener > renders with the dark styles for the dark theme', () => {
  customRender(<EasyButton>Easy</EasyButton>, 'dark')

  const button = screen.getByRole('button', {name: /easy/i})

  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

test('imported custom rener > renders with the dark styles for the dark theme', () => {
  importedCustomRender(<EasyButton>Easy</EasyButton>, {theme: 'dark'})

  const button = screen.getByRole('button', {name: /easy/i})

  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})
