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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('pdick')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#togglableShow-button').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('testurl.com')
      cy.get('#create-button').click()

      cy.contains('test title test author')
    })
  })

  describe('When a blog has been created', function(){
    beforeEach(function(){
      cy.get('#username').type('pdick')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.get('#togglableShow-button').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('testurl.com')
      cy.get('#create-button').click()
    })

    it('A blog can be liked', function(){
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function(){
      cy.contains('test title test author')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('test title test author').should('not.exist')
    })
  })
})