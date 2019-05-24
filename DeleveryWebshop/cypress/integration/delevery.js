
describe('cypress test', function() {
  it('routing add product', function() {
    cy.visit('http://localhost:4200/')
    cy.contains('+').click()

    cy.url().should('include', '/add-product')
  })
  it('forms', function() {
    cy.get('[formControlName="name"]').type('test')
      .should('have.value', 'test')

    cy.get('[formControlName="price"]').type(123)
        .should('have.value', '123')
    cy.get('[formControlName="details"]').type('test')
      .should('have.value', 'test')

  })
  it('error upload product without image', function() {
    //cy.contains('Save').click()
    const stub = cy.stub()

    cy.on('window:alert', (str) => {
      expect( cy.contains('Save').click()).toThrowError();
    })
  })
  it('logout', function () {
    cy.visit('http://localhost:4200/')
    cy.contains('Main screen').click();
    cy.contains('logout').click()

  })
  it('login', function () {
    cy.contains('Login').click()
    cy.get('[formControlName="password"]').type('123456')
      .should('have.value', '123456')

    cy.get('[formControlName="email"]').type('facejs@live.dk')
      .should('have.value', 'facejs@live.dk')
    cy.get('#login').click()
    cy.contains('facejs@live.dk')
    cy.contains('Main screen').click();
  })

    it('add to cart', function() {
      cy.visit('http://localhost:4200/')
      cy.contains('Add to cart').click();
      it("increse cart number to 1", () => {

        cy.get("#item").as("creditBalance")

        cy.get("@creditBalance").should("contain", 1)

      });
      cy.contains('Main screen').click();
    })
  it('routing add user', function() {
    cy.visit('http://localhost:4200/')
    cy.contains('Show user').click();
    cy.url().should('include', '/users')
    cy.contains('Main screen').click();
    })
  it('add user contains 5 forms', function() {
    cy.visit('http://localhost:4200/')
    cy.contains('Add User').click();
    cy.get('[formControlName="Username"]').type('123456')
      .should('have.value', '123456')
    cy.get('[formControlName="Password"]').type('123456')
      .should('have.value', '123456')
    cy.get('[formControlName="Address"]').select('Esbjerg')
      .should('have.value', 'Esbjerg')
    cy.get('[formControlName="Email"]').type('123456')
      .should('have.value', '123456')
    cy.get('[formControlName="Phonenumber"]').type(123)
      .should('have.value', '123')
    cy.contains('Main screen').click();
  })
  it('go to order by clicking Order', function() {
    cy.visit('http://localhost:4200/')
    cy.contains('Order').click();
    cy.url().should('include', '/orders')
    cy.contains('Main screen').click();
  })
  it('go to order by clicking Cart', function() {

    cy.get('#image').click();
    cy.url().should('include', '/orders')
    cy.contains('Main screen').click();
  })
})
