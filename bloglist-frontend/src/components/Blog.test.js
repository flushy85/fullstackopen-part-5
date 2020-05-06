import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'this is a test blog title',
  author: 'ada lovlace',
  url: 'www.testingwebsite.com',
  likes: 5,
  user: {
    username: 'joeblogs123'
  }
}

describe('<Blog/ >', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })


  test('renders its children', () => {
    expect(
      component.container.querySelector('.blogDetails')).toBeDefined()
    expect(
      component.container.querySelector('.blogTitle')).toBeDefined()
  })

  test('author and title are visible initially but details arent', () => {
    expect(
      component.container.querySelector('.blogTitle'))
      .not.toHaveStyle('display: none')
    expect(
      component.container.querySelector('.blogDetails'))
      .toHaveStyle('display: none')
  })

  test('after clicking button details are displayed', () => {
    const button = component.container.querySelector('.blogTitle')
    fireEvent.click(button)

    expect(
      component.container.querySelector('.blogDetails'))
      .not.toHaveStyle('display: none')
  })

})