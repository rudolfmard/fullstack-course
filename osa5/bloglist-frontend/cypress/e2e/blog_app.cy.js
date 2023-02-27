describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const testUser = {
      name: 'Poppy Dickings',
      username: 'pdick',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('pdick')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Poppy Dickings logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('pduck')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
})