describe('digitCode', () => {
  it('should match digit code', () => {
    cy.visit('/')

    cy.get('#digit-code-section').matchImageSnapshot('pristine')

    cy.get('#digit-code__triangle-1-button').click()
    cy.get('#digit-code__triangle-2-button').click()
    cy.get('#digit-code__triangle-3-button').click()
    cy.get('#digit-code__triangle-3-button').click()
    cy.get('#digit-code__triangle-4-button').click()
    cy.get('#digit-code__square-1-button').click()
    cy.get('#digit-code__square-2-button').click()
    cy.get('#digit-code__square-2-button').click()
    cy.get('#digit-code__square-5-button').click()
    cy.get('#digit-code__circle-2-button').click()
    cy.get('#digit-code__circle-3-button').click()
    cy.get('#digit-code__circle-4-button').click()
    cy.get('#digit-code__circle-4-button').click().blur()

    cy.get('#digit-code-section').matchImageSnapshot('filled')

    cy.get('#digit-code__clear-button').click().blur()

    cy.get('#digit-code-section').matchImageSnapshot('cleared')
  })
})
