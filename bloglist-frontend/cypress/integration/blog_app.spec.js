describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Greg Burdick',
      username: 'Admin',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to App')
    cy.contains('username')
  })

  it('Login is successful with correct password', function() {
    cy.get('#username').type('Admin')
    cy.get('#password').type('123')
    cy.get('#login-button').click()
    cy.contains('Logged in')
  })

  it('Login fails with wrong password', function() {
    cy.get('#username').type('Admin')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error').should('contain', 'Wrong').and('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ name: 'Greg Burdick', username: 'Admin', password: '123' })
    })

    it('A blog can be created', function() {
      cy.get('#details-button').click()
      cy.get('#title').type('this is a made up blog title')
      cy.get('#author').type('Diana Princess')
      cy.get('#url').type('www.sausageparty.com')
      cy.get('#create-button').click()
      cy.get('.blog-title').should('contain', 'this is a made up blog title')
    })



    it('user can like a blog', function() {
      cy.get('.blog-title').click()
      cy.get('#like-button').click()
      cy.get('#like-button').should('contain', 'unlike')
    })

    it('user can delete blog they added', function() {
      cy.get('.blog-title').click()
      cy.get('#remove-button').click()
      cy.get('.blog-title').should('not.contain', 'this is a made up blog title')
    })
  })
})
