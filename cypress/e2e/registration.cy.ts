describe('registration', () => {
  it('should register and clear', () => {
    cy.visit('/')

    cy.get('#registration__name-text-field').type('john doe')
    cy.get('#registration__hash-text-field').type('B62 0GL M').blur()

    cy.get('#registration-section').matchImageSnapshot('filled registration')

    cy.get('#registration__name-text-field__clear-button').click()
    cy.get('#registration__hash-text-field__clear-button').click()

    cy.get('#registration-section').matchImageSnapshot('cleared registration')
  })
})
