describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const testUser = {
      name: 'Poppy Dickings',
      username: 'pdick',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser)

    const testUser2 = {
      name: 'Dicky Poppings',
      username: 'dpop',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser2)

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

    it('Only user who added the blog can see remove button', function(){
      cy.contains('view').click()
      cy.contains('remove')

      cy.contains('logout').click()

      cy.get('#username').type('dpop')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.contains('remove').and('have.css', 'display', 'none')
    })

    it('The blogs are sorted by likes', function(){
      cy.get('#title').type('test title2')
      cy.get('#author').type('test author2')
      cy.get('#url').type('testurl2.com')
      cy.get('#create-button').click()

      cy.contains('test title2 test author2')
      cy.get('.view-button').eq(0).click()
      cy.get('.view-button').click()

      cy.get('.blog').eq(1).should('contain', 'test title2 test author2').and('contain', 'likes 0')

      cy.get('.like-button').eq(1).click()
      cy.get('.blog').eq(0).should('contain', 'test title2 test author2').and('contain', 'likes 1')
    })
  })
})