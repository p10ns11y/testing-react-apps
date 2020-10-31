// form testing
// http://localhost:3000/login

import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

test('excercise > submitting the form calls onSubmit with username and password', () => {
  let submittedData
  const handleSubmit = (data) => (submittedData = data)

  render(<Login onSubmit={handleSubmit}/>)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, 'peram')
  userEvent.type(passwordField, 'test')

  const submitButton = screen.getByRole('button', { name: /submit/i })

  userEvent.click(submitButton)

  expect(submittedData).toEqual({username: 'peram', password: 'test'})
})

test('extra-1 > submitting the form calls onSubmit with username and password', () => {
  const onSubmitMock = jest.fn()
  render(<Login onSubmit={onSubmitMock} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, 'peram')
  userEvent.type(passwordField, 'test')

  const submitButton = screen.getByRole('button', {name: /submit/i})

  userEvent.click(submitButton)

  expect(onSubmitMock).toHaveBeenCalledWith({username: 'peram', password: 'test'})
})

test('extra-2 > submitting the form calls onSubmit with username and password', () => {
  const buildLoginForm = () => ({
    username: faker.internet.userName(),
    password: faker.internet.password()
  })
  const {username, password} = buildLoginForm()
  const onSubmitMock = jest.fn()

  render(<Login onSubmit={onSubmitMock} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)

  const submitButton = screen.getByRole('button', {name: /submit/i})

  userEvent.click(submitButton)

  expect(onSubmitMock).toHaveBeenCalledWith({
    username,
    password,
  })
})

test('extra-3 > submitting the form calls onSubmit with username and password', () => {
  const buildLoginForm = (overrides) => ({
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  })
  const {username, password} = buildLoginForm({password: 'strongPassWord'})
  const onSubmitMock = jest.fn()

  render(<Login onSubmit={onSubmitMock} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)

  const submitButton = screen.getByRole('button', {name: /submit/i})

  userEvent.click(submitButton)

  expect(onSubmitMock).toHaveBeenCalledWith({
    username,
    password,
  })
})

test('extra-4 > submitting the form calls onSubmit with username and password', () => {

  const formDataBuilder = build({
    fields: {
      username: fake(f => f.internet.userName()),
      password: fake(f => f.internet.password())
    }
  })
  const {username, password} = formDataBuilder()
  const onSubmitMock = jest.fn()

  render(<Login onSubmit={onSubmitMock} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)

  const submitButton = screen.getByRole('button', {name: /submit/i})

  userEvent.click(submitButton)

  expect(onSubmitMock).toHaveBeenCalledWith({
    username,
    password,
  })
})
