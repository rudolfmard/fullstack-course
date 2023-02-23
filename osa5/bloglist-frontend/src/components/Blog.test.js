import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders un-togglable content only', async () => {
  const blog = {
    user: 'test user',
    likes: 0,
    author: 'test author',
    title: 'test title',
    url: 'test url',
    id: 'test id'
  }

  render(<Blog blog={blog} addLike={null} removeBlog={null} username={'test user'}/>)

  const element = screen.getByText('test title test author')
  expect(element).toBeDefined()

  const element2 = screen.queryByText('test url', { exact: false })
  expect(element2).toBeNull()

  const element3 = screen.queryByText(0, { exact: false })
  expect(element3).toBeNull()
})