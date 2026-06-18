describe('E-commerce Basic E2E Tests', () => {
  beforeEach(() => {

    cy.visit('/')
  })

  it('successfully loads the homepage and its sections', () => {

    cy.get('header').should('be.visible')
    cy.contains('Bhanu').should('be.visible')


    cy.contains('Trending Categories').should('be.visible')
    cy.contains('Our Products').should('be.visible')
  })

  it('can open and close the empty cart drawer', () => {

    cy.contains('span.sr-only', 'items in cart').parent().click({ force: true })


    cy.contains('Shopping Cart').should('be.visible')
    cy.contains('Your cart is empty').should('be.visible')


    cy.contains('span.sr-only', 'Close panel').parent().click({ force: true })
    cy.contains('Shopping Cart').should('not.exist')
  })

  it('can add a product to the cart', () => {

    cy.contains('Our Products').should('be.visible')


    cy.contains('Add to bag').first().click({ force: true })


    cy.contains('span.sr-only', 'items in cart').parent().click({ force: true })


    cy.contains('Shopping Cart').should('be.visible')
    cy.contains('Checkout Now').should('be.visible')
    cy.contains('Subtotal').should('be.visible')
  })

  it('can navigate to product details', () => {

    cy.contains('Our Products').should('be.visible')


    cy.get('.lg\\:col-span-3').find('h3').first().click({ force: true })


    cy.url().should('include', '/product/')


    cy.contains('Add to cart').should('be.visible')
  })
})
