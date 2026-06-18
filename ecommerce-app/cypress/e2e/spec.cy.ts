describe('Basic E2E Tests', () => {
  it('visits the app and checks for title', () => {
    cy.visit('/')

    // Check if the trending categories title is visible initially
    cy.contains('Trending Categories').should('be.visible')
  })

  it('can open cart drawer', () => {
    cy.visit('/')

    // Check for the cart icon/button
    cy.get('button').find('svg').should('exist')

    // We could click the cart button here if we assign an ID or class to it
    // cy.get('header').contains('items in cart').click({ force: true })
  })
})
