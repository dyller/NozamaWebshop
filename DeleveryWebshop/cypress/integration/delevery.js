
describe('create Without image', function() {
  it('Gets, types and asserts', function() {
    cy.visit('http://localhost:4200/')
    cy.contains('+').click()

    cy.url().should('include', '/add-product')

    cy.get('[formControlName="name"]').type('test')
      .should('have.value', 'test')

    cy.get('[formControlName="price"]').type(123)
        .should('have.value', '123')
    cy.contains('Save').click()
    const stub = cy.stub()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Bad stuff happened: You need better metadata')
    })

  })
})

describe('My First Test', function() {
  it('Gets, types and asserts', function() {
    cy.contains('Main screen').click();
    cy.contains('logout').click()
    cy.contains('Login').click()
    cy.get('[formControlName="password"]').type('123456')
      .should('have.value', '123456')

    cy.get('[formControlName="email"]').type('facejs@live.dk')
      .should('have.value', 'facejs@live.dk')
    cy.get('#login').click()
    cy.contains('123456')
    cy.contains('Main screen').click();
  })
  describe('add items to cart', function() {
    it('Gets, types and asserts', function() {
      cy.visit('http://localhost:4200/')
      cy.contains('Add to cart').click();
    })
})
