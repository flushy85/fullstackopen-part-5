import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import PostForm from './PostForm'

const newPost = {
  title: 'this is a test title post',
  author: 'Greg Burdick',
  url: 'www.thisIsMadeUp.com'
}


describe('<PostForm />', () => {
  let component

  beforeEach(() => {
    component = render(
      <PostForm />
    )
  })
})